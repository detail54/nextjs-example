'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { ChevronRight, Layers, MoreHorizontal } from 'lucide-react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { COMMON_MSG } from '@/context/messages/commonMsg'
import { useEpicPanelStore } from '@/stores/useEpicPanelStore'
import { useTaskPanelStore } from '@/stores/useTaskPanelStore'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useEpicDelete, useEpicUpdate } from '@/features/board/hooks/useEpic'
import { useTaskMove } from '@/features/board/hooks/useTask'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { EpicWithTasks, BoardTask } from '@/features/board/api/type'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import Icon from '@/components/icon/Icon'
import Tooltip from '@/components/tooltip/Tooltip'
import TimelineTaskInlineCreate from './TimelineTaskInlineCreate'
import TimelineTaskRow from './TimelineTaskRow'
import TimelineColorPopover from './TimelineColorPopover'
import {
  MONTH_WIDTH,
  TOTAL_MONTHS,
  EPIC_ROW_HEIGHT,
  TASK_ROW_HEIGHT,
  calcBarPosition,
  getTodayX,
  getMonthList,
  formatBarTooltip,
} from '../utils/timelineUtils'
import { timelineEpicRowStyles } from './TimelineEpicRow.styles'

// 타임라인 월 목록 (렌더링 시 1번만 계산)
const MONTHS = getMonthList()
const TODAY_X = getTodayX()
const TOTAL_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

// priority 재계산 로직 (앞뒤 태스크의 중간값)
function calcPriority(prev: BoardTask | undefined, next: BoardTask | undefined): number {
  if (!prev && next) return next.priority - 1000
  if (prev && !next) return prev.priority + 1000
  if (prev && next) return Math.floor((prev.priority + next.priority) / 2)
  return 0
}

// priority ASC 정렬
function sortByPriority(tasks: BoardTask[]): BoardTask[] {
  return [...tasks].sort((a, b) => a.priority - b.priority)
}

interface TimelineEpicRowProps {
  epic: EpicWithTasks
  onResizeStart: (e: React.MouseEvent) => void
}

// 에픽 행 + 하위 태스크 행 (드래그 정렬 포함) 컴포넌트
export default function TimelineEpicRow({ epic, onResizeStart }: TimelineEpicRowProps) {
  // 태스크 펼침 여부
  const [isOpen, setIsOpen] = useState(false)
  // 인라인 태스크 생성 입력 표시 여부
  const [isCreating, setIsCreating] = useState(false)
  // 로컬 태스크 목록 (DnD 낙관적 UI용)
  const [tasks, setTasks] = useState<BoardTask[]>(() => sortByPriority(epic.tasks))
  // 드래그 중인 태스크
  const [activeTask, setActiveTask] = useState<BoardTask | null>(null)
  // epic.tasks 변경 감지용 이전 참조
  const [prevEpicTasks, setPrevEpicTasks] = useState(epic.tasks)

  // epic.tasks 외부 변경 시 로컬 상태 동기화 (드래그 중이 아닐 때만)
  if (epic.tasks !== prevEpicTasks) {
    setPrevEpicTasks(epic.tasks)
    if (!activeTask) {
      setTasks(sortByPriority(epic.tasks))
    }
  }

  // 에픽 바 색상 팝오버 상태
  const [epicColorPopover, setEpicColorPopover] = useState<{ x: number; y: number } | null>(null)

  const { isAdmin } = useAuth()
  const { openEpicEdit } = useEpicPanelStore()
  const { openTaskDetail } = useTaskPanelStore()
  const { openConfirmModal } = useConfirmModalStore()
  const { mutate: deleteEpic } = useEpicDelete()
  const { mutate: updateEpic } = useEpicUpdate()
  const { mutate: moveTask } = useTaskMove()

  const handleEdit = () => openEpicEdit(epic)

  const handleDeleteClick = () => {
    openConfirmModal({
      type: 'confirm',
      title: COMMON_MSG.EPIC_DELETE_CONFIRM_TITLE,
      description: COMMON_MSG.EPIC_DELETE_CONFIRM_DESC,
      confirmLabel: COMMON_MSG.EPIC_DELETE_CONFIRM,
      variant: 'danger',
      onConfirm: () => deleteEpic(epic.id),
    })
  }

  // 하위 작업 등록: 펼치고 인라인 입력 표시
  const handleTaskCreate = () => {
    setIsOpen(true)
    setIsCreating(true)
  }

  // 관리자 전용 드롭다운 메뉴 항목
  const dropdownItems = [
    { label: TIMELINE_MSG.EPIC_EDIT, onClick: handleEdit },
    { label: TIMELINE_MSG.TASK_CREATE, onClick: handleTaskCreate },
    { label: TIMELINE_MSG.EPIC_DELETE, onClick: handleDeleteClick, danger: true },
  ]

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 5px 이상 움직여야 드래그 시작 (클릭과 구분)
      activationConstraint: { distance: 5 },
    }),
  )

  // 드래그 시작: activeTask 설정
  const onDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      setActiveTask(tasks.find((t) => t.id === active.id) ?? null)
    },
    [tasks],
  )

  // 드래그 종료: 순서 변경 + priority 재계산 + 서버 저장
  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      setActiveTask(null)
      if (!over || active.id === over.id) return

      const oldIndex = tasks.findIndex((t) => t.id === active.id)
      const newIndex = tasks.findIndex((t) => t.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(tasks, oldIndex, newIndex)
      const newPriority = calcPriority(reordered[newIndex - 1], reordered[newIndex + 1])
      reordered[newIndex] = { ...reordered[newIndex], priority: newPriority }

      setTasks(reordered)
      moveTask({
        id: active.id as number,
        status: reordered[newIndex].status,
        priority: newPriority,
      })
    },
    [tasks, moveTask],
  )

  // 드래그 취소: activeTask만 초기화 (순서 복원은 불필요 — DnD Kit이 자동 처리)
  const onDragCancel = useCallback(() => {
    setActiveTask(null)
  }, [])

  // 에픽 바 위치 계산
  const epicBar = calcBarPosition(epic.startDate, epic.dueDate)

  // 하위 태스크 상태별 카운트
  const totalTasks = epic.tasks.length
  const donePct = totalTasks
    ? Math.round((epic.tasks.filter((t) => t.status === 'done').length / totalTasks) * 100)
    : 0
  const inProgressPct = totalTasks
    ? Math.round((epic.tasks.filter((t) => t.status === 'in_progress').length / totalTasks) * 100)
    : 0
  const todoPct = totalTasks ? 100 - donePct - inProgressPct : 0

  return (
    <>
      {/* 에픽 행 */}
      <div className={timelineEpicRowStyles.epicRow()} style={{ height: EPIC_ROW_HEIGHT }}>
        {/* 왼쪽: 에픽 정보 (sticky) */}
        <div
          className={`relative ${timelineEpicRowStyles.epicLeft}`}
          style={
            { width: 'var(--left-width)', minWidth: 'var(--left-width)' } as React.CSSProperties
          }
        >
          {/* 구분선 드래그 핸들 */}
          <div
            className='absolute right-0 top-0 bottom-0 w-3 cursor-col-resize translate-x-1/2 z-10'
            onMouseDown={onResizeStart}
          />

          {/* 하위 태스크 토글 버튼 */}
          <button
            type='button'
            className={timelineEpicRowStyles.toggleBtn}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
          >
            <ChevronRight
              size={14}
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s ease',
              }}
            />
          </button>

          {/* 에픽 아이콘 + 제목 + 더보기 + 진행도 바 */}
          <div className={timelineEpicRowStyles.epicTitleGroup}>
            {/* 아이콘 + 제목 + 더보기 가로 행 */}
            <div className={timelineEpicRowStyles.epicTitleRow}>
              <Layers size={14} className='shrink-0 text-primary-400' />
              <span className={timelineEpicRowStyles.epicTitle}>{epic.title}</span>
              {/* ⋯ 드롭다운 (관리자만) */}
              {isAdmin && (
                <div className={timelineEpicRowStyles.moreWrapper}>
                  <DropdownMenu
                    trigger={<Icon icon={MoreHorizontal} size='sm' />}
                    triggerClassName={timelineEpicRowStyles.moreBtn}
                    items={dropdownItems}
                  />
                </div>
              )}
            </div>
            {/* 진행도 바 (태스크 있을 때만) */}
            {totalTasks > 0 && (
              <div className={timelineEpicRowStyles.progressBar}>
                {donePct > 0 && (
                  <div
                    className={timelineEpicRowStyles.progressSegment({ status: 'done' })}
                    style={{ width: `${donePct}%` }}
                  />
                )}
                {inProgressPct > 0 && (
                  <div
                    className={timelineEpicRowStyles.progressSegment({ status: 'in_progress' })}
                    style={{ width: `${inProgressPct}%` }}
                  />
                )}
                {todoPct > 0 && (
                  <div
                    className={timelineEpicRowStyles.progressSegment({ status: 'todo' })}
                    style={{ width: `${todoPct}%` }}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 타임라인 바 영역 */}
        <div
          className={timelineEpicRowStyles.epicRight}
          style={{ width: TOTAL_WIDTH, height: EPIC_ROW_HEIGHT }}
        >
          {/* 월 구분선 및 현재 월 하이라이트 */}
          {MONTHS.map((m, i) => (
            <div key={i}>
              {m.isCurrent && (
                <div
                  className={timelineEpicRowStyles.currentMonthBg}
                  style={{ left: i * MONTH_WIDTH, width: MONTH_WIDTH }}
                />
              )}
              {/* i=0은 왼쪽 컬럼 border-r과 겹치므로 skip */}
              {i > 0 && (
                <div
                  className={timelineEpicRowStyles.monthLine}
                  style={{ left: i * MONTH_WIDTH }}
                />
              )}
            </div>
          ))}

          {/* 오늘 표시선 */}
          {TODAY_X >= 0 && TODAY_X <= TOTAL_WIDTH && (
            <div className={timelineEpicRowStyles.todayLine} style={{ left: TODAY_X }} />
          )}

          {/* 에픽 바 */}
          {epicBar && (
            <Tooltip content={formatBarTooltip(epic.startDate, epic.dueDate)}>
              <div
                className={timelineEpicRowStyles.epicBar({
                  status: epic.color ? undefined : epic.status,
                })}
                style={{
                  left: epicBar.left,
                  width: epicBar.width,
                  top: 10,
                  height: EPIC_ROW_HEIGHT - 20,
                  ...(epic.color ? { backgroundColor: epic.color } : {}),
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEpicColorPopover({ x: e.clientX, y: e.clientY })
                }}
              >
                <span className={timelineEpicRowStyles.epicBarText}>{epic.title}</span>
              </div>
            </Tooltip>
          )}

          {/* 에픽 바 색상 팝오버 */}
          {epicColorPopover && (
            <TimelineColorPopover
              position={epicColorPopover}
              value={epic.color}
              onChange={(color) => {
                updateEpic({
                  id: epic.id,
                  title: epic.title,
                  description: epic.description ?? undefined,
                  status: epic.status,
                  startDate: epic.startDate,
                  dueDate: epic.dueDate,
                  color,
                })
              }}
              onClose={() => setEpicColorPopover(null)}
            />
          )}
        </div>
      </div>

      {/* 하위 태스크 행 (펼쳐진 경우, DnD 정렬 가능) */}
      {isOpen && (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragCancel={onDragCancel}
        >
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TimelineTaskRow
                key={task.id}
                task={task}
                onResizeStart={onResizeStart}
                onClickDetail={openTaskDetail}
              />
            ))}
          </SortableContext>

          {/* 드래그 중 오버레이 (좌측 열만 표시) */}
          <DragOverlay zIndex={9999}>
            {activeTask ? (
              <TimelineTaskRow
                task={activeTask}
                onResizeStart={onResizeStart}
                overlay
                onClickDetail={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* 인라인 태스크 생성 입력 (펼쳐진 상태에서 하위 작업 등록 클릭 시) */}
      {isOpen && isCreating && (
        <div className='flex'>
          <TimelineTaskInlineCreate
            epicId={epic.id}
            onSuccess={() => setIsCreating(false)}
            onCancel={() => setIsCreating(false)}
          />
          {/* 오른쪽 빈 영역 */}
          <div style={{ width: TOTAL_WIDTH, height: TASK_ROW_HEIGHT }} />
        </div>
      )}
    </>
  )
}
