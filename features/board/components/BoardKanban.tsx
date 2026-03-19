'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { TaskStatus } from '@/server/db/type'
import type { EpicWithTasks, BoardTask, KanbanColumns } from '@/features/common/api/type'
import { useTaskMove } from '../hooks/useTask'
import BoardKanbanColumn from './BoardKanbanColumn'
import BoardTaskCard from './BoardTaskCard'
import { kanbanStyles } from './BoardKanban.styles'

// 상태 목록 (렌더링 순서)
const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'done']

// query 데이터 → 컬럼별 분류 초기화
function buildColumns(tasks: BoardTask[]): KanbanColumns {
  const columns: KanbanColumns = { todo: [], in_progress: [], done: [] }
  for (const task of tasks) {
    columns[task.status].push(task)
  }
  // 각 컬럼을 priority ASC 정렬
  for (const status of STATUSES) {
    columns[status].sort((a, b) => a.priority - b.priority)
  }
  return columns
}

// priority 재계산 로직
function calcPriority(prev: BoardTask | undefined, next: BoardTask | undefined): number {
  if (!prev && next) return next.priority - 1000
  if (prev && !next) return prev.priority + 1000
  if (prev && next) return Math.floor((prev.priority + next.priority) / 2)
  return 0
}

type Props = {
  epic: EpicWithTasks
}

// 에픽 내 칸반 보드 (DnD 핵심 컴포넌트)
export default function BoardKanban({ epic }: Props) {
  const [columns, setColumns] = useState<KanbanColumns>(() => buildColumns(epic.tasks))
  // 드래그 시작 전 원본 상태 (취소 시 복원)
  const [originalColumns, setOriginalColumns] = useState<KanbanColumns | null>(null)
  // 드래그 중인 태스크 (null이면 드래그 미진행 상태)
  const [activeTask, setActiveTask] = useState<BoardTask | null>(null)
  // 이전 tasks 참조 (변경 감지용)
  const [prevTasks, setPrevTasks] = useState(epic.tasks)

  // epic.tasks 변경 시 columns 동기화 - 렌더 중 즉시 처리 (getDerivedStateFromProps 패턴)
  // activeTask가 null일 때만 동기화 (드래그 중 덮어쓰기 방지)
  if (epic.tasks !== prevTasks) {
    setPrevTasks(epic.tasks)
    if (activeTask === null) {
      setColumns(buildColumns(epic.tasks))
    }
  }

  const { mutate: moveTask } = useTaskMove()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 5px 이상 움직여야 드래그 시작 (클릭 이벤트와 구분)
      activationConstraint: { distance: 5 },
    }),
  )

  // 주어진 id가 속한 컬럼(TaskStatus) 반환
  // id가 column status string이면 그대로 반환, task id(number)이면 해당 컬럼 탐색
  const findContainer = useCallback(
    (id: string | number): TaskStatus | undefined => {
      // 컬럼 id로 직접 매핑
      if (typeof id === 'string' && (STATUSES as string[]).includes(id)) {
        return id as TaskStatus
      }
      // task id로 컬럼 탐색
      const numId = typeof id === 'number' ? id : Number(id)
      for (const status of STATUSES) {
        if (columns[status].some((t) => t.id === numId)) {
          return status
        }
      }
      return undefined
    },
    [columns],
  )

  // 드래그 시작: 원본 상태 저장 + activeTask 설정
  const onDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      const task = Object.values(columns)
        .flat()
        .find((t) => t.id === active.id)
      setActiveTask(task ?? null)
      setOriginalColumns({
        ...columns,
        ...Object.fromEntries(STATUSES.map((s) => [s, [...columns[s]]])),
      } as KanbanColumns)
    },
    [columns],
  )

  // 드래그 오버: 실시간 컬럼 이동 처리
  const onDragOver = useCallback(
    ({ active, over }: DragOverEvent) => {
      if (!over) return

      const activeContainer = findContainer(active.id)
      const overContainer = findContainer(over.id)

      if (!activeContainer || !overContainer) return

      // 같은 컬럼 내 이동
      if (activeContainer === overContainer) {
        setColumns((prev) => {
          const items = prev[activeContainer]
          const oldIndex = items.findIndex((t) => t.id === active.id)
          const newIndex = items.findIndex((t) => t.id === over.id)
          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev
          return { ...prev, [activeContainer]: arrayMove(items, oldIndex, newIndex) }
        })
        return
      }

      // 다른 컬럼으로 이동
      setColumns((prev) => {
        const sourceItems = [...prev[activeContainer]]
        const destItems = [...prev[overContainer]]

        const movedTask = sourceItems.find((t) => t.id === active.id)
        if (!movedTask) return prev

        // 소스 컬럼에서 제거
        const newSource = sourceItems.filter((t) => t.id !== active.id)

        // 대상 컬럼의 over 위치에 삽입
        const overIndex = destItems.findIndex((t) => t.id === over.id)
        const insertIndex = overIndex === -1 ? destItems.length : overIndex

        const updatedTask: BoardTask = { ...movedTask, status: overContainer }
        const newDest = [...destItems]
        newDest.splice(insertIndex, 0, updatedTask)

        return {
          ...prev,
          [activeContainer]: newSource,
          [overContainer]: newDest,
        }
      })
    },
    [findContainer],
  )

  // 드래그 종료: priority 재계산 + 서버 저장
  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveTask(null)
      setOriginalColumns(null)

      if (!over) return

      const overContainer = findContainer(over.id)
      if (!overContainer) return

      // columns를 직접 읽어 task 위치 파악 (updater 안에서 side effect 금지)
      const destItems = columns[overContainer]
      const taskIndex = destItems.findIndex((t) => t.id === active.id)
      if (taskIndex === -1) return

      const prevTask = destItems[taskIndex - 1]
      const nextTask = destItems[taskIndex + 1]
      const newPriority = calcPriority(prevTask, nextTask)

      const updatedTask: BoardTask = {
        ...destItems[taskIndex],
        status: overContainer,
        priority: newPriority,
      }

      const newDest = [...destItems]
      newDest[taskIndex] = updatedTask

      // state 업데이트는 순수하게, API 호출은 별도로 (Strict Mode에서도 1번만 실행)
      setColumns((prev) => ({ ...prev, [overContainer]: newDest }))
      moveTask({ id: updatedTask.id, status: overContainer, priority: newPriority })
    },
    [columns, findContainer, moveTask],
  )

  // 드래그 취소: 원래 상태로 복원
  const onDragCancel = useCallback(() => {
    setActiveTask(null)
    if (originalColumns) {
      setColumns(originalColumns)
    }
    setOriginalColumns(null)
  }, [originalColumns])

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className={kanbanStyles.grid}>
        {STATUSES.map((status) => (
          <BoardKanbanColumn
            key={status}
            status={status}
            tasks={columns[status]}
            epicId={epic.id}
          />
        ))}
      </div>

      {/* 드래그 중 표시되는 오버레이 카드 (LNB보다 위) */}
      <DragOverlay zIndex={9999}>
        {activeTask ? <BoardTaskCard task={activeTask} overlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}
