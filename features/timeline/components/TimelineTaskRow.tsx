'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CheckSquare, GripVertical } from 'lucide-react'
import type { BoardTask } from '@/features/board/api/type'
import Tooltip from '@/components/tooltip/Tooltip'
import { useTaskUpdate } from '@/features/board/hooks/useTask'
import TimelineColorPopover from './TimelineColorPopover'
import {
  MONTH_WIDTH,
  TOTAL_MONTHS,
  TASK_ROW_HEIGHT,
  calcBarPosition,
  getTodayX,
  getMonthList,
  formatBarTooltip,
} from '../utils/timelineUtils'
import { timelineEpicRowStyles } from './TimelineEpicRow.styles'

const MONTHS = getMonthList()
const TODAY_X = getTodayX()
const TOTAL_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

interface TimelineTaskRowProps {
  task: BoardTask
  onResizeStart: (e: React.MouseEvent) => void
  // DragOverlay용 렌더링 여부 (true이면 useSortable 없이 단순 렌더링)
  overlay?: boolean
  onClickDetail: (task: BoardTask) => void
}

// 드래그 가능한 태스크 행 컴포넌트
export default function TimelineTaskRow({
  task,
  onResizeStart,
  overlay = false,
  onClickDetail,
}: TimelineTaskRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: overlay,
  })

  // 태스크 바 색상 팝오버 상태
  const [taskColorPopover, setTaskColorPopover] = useState<{ x: number; y: number } | null>(null)
  const { mutate: updateTask } = useTaskUpdate()

  const taskBar = calcBarPosition(task.startDate, task.dueDate)

  const style = overlay ? undefined : { transform: CSS.Transform.toString(transform), transition }

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={{ ...style, height: TASK_ROW_HEIGHT }}
      className={timelineEpicRowStyles.taskRow()}
    >
      {/* 왼쪽: 태스크 정보 (sticky) */}
      <div
        className={`relative ${timelineEpicRowStyles.taskLeft} ${isDragging ? 'opacity-50' : ''}`}
        style={{ width: 'var(--left-width)', minWidth: 'var(--left-width)' } as React.CSSProperties}
      >
        {/* 구분선 드래그 핸들 */}
        <div
          className='absolute right-0 top-0 bottom-0 w-3 cursor-col-resize translate-x-1/2 z-10'
          onMouseDown={onResizeStart}
        />

        {/* 드래그 핸들 (호버 시 표시) */}
        <div
          {...(overlay ? {} : { ...attributes, ...listeners })}
          className='shrink-0 cursor-grab text-secondary-400 opacity-0 group-hover/task-row:opacity-100 transition-opacity duration-150 active:cursor-grabbing'
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={12} />
        </div>

        {/* 태스크 아이콘 + 제목 (클릭 시 상세 패널) */}
        <div
          className='flex items-center gap-2 flex-1 min-w-0 cursor-pointer hover:text-white transition-colors'
          onClick={() => onClickDetail(task)}
        >
          <CheckSquare size={12} className='shrink-0 text-secondary-400' />
          <span className={timelineEpicRowStyles.taskTitle}>{task.title}</span>
        </div>
      </div>

      {/* 오른쪽: 태스크 타임라인 바 영역 */}
      <div
        className={timelineEpicRowStyles.taskRight}
        style={{ width: TOTAL_WIDTH, height: TASK_ROW_HEIGHT }}
      >
        {MONTHS.map((m, i) => (
          <div key={i}>
            {m.isCurrent && (
              <div
                className={timelineEpicRowStyles.currentMonthBg}
                style={{ left: i * MONTH_WIDTH, width: MONTH_WIDTH }}
              />
            )}
            {i > 0 && (
              <div className={timelineEpicRowStyles.monthLine} style={{ left: i * MONTH_WIDTH }} />
            )}
          </div>
        ))}
        {TODAY_X >= 0 && TODAY_X <= TOTAL_WIDTH && (
          <div className={timelineEpicRowStyles.todayLine} style={{ left: TODAY_X }} />
        )}
        {taskBar && (
          <Tooltip content={formatBarTooltip(task.startDate, task.dueDate)}>
            <div
              className={timelineEpicRowStyles.taskBar}
              style={{
                left: taskBar.left,
                width: taskBar.width,
                top: 8,
                height: TASK_ROW_HEIGHT - 16,
                ...(task.color ? { backgroundColor: task.color } : {}),
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation()
                setTaskColorPopover({ x: e.clientX, y: e.clientY })
              }}
            >
              <span className={timelineEpicRowStyles.taskBarText}>{task.title}</span>
            </div>
          </Tooltip>
        )}

        {/* 태스크 바 색상 팝오버 */}
        {taskColorPopover && (
          <TimelineColorPopover
            position={taskColorPopover}
            value={task.color}
            onChange={(color) => {
              updateTask({
                id: task.id,
                title: task.title,
                description: task.description ?? undefined,
                status: task.status,
                startDate: task.startDate,
                dueDate: task.dueDate,
                color,
              })
            }}
            onClose={() => setTaskColorPopover(null)}
          />
        )}
      </div>
    </div>
  )
}
