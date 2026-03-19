'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBoardPanelStore } from '@/stores/useBoardPanelStore'
import DueDateBadge from '@/components/due-date-badge/DueDateBadge'
import type { BoardTask } from '../api/type'
import { taskCardStyles } from './BoardTaskCard.styles'

type Props = {
  task: BoardTask
  // DragOverlay용 렌더링 여부 (true이면 useSortable 없이 단순 렌더링)
  overlay?: boolean
}

// 드래그 가능한 task 카드
export default function BoardTaskCard({ task, overlay = false }: Props) {
  const { setSelectedTask } = useBoardPanelStore()

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    // overlay 모드일 때는 비활성화 (DragOverlay 내부에서 사용)
    disabled: overlay,
  })

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      }

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={taskCardStyles.card({ isDragging: !overlay && isDragging, isOverlay: overlay })}
      onClick={overlay ? undefined : () => setSelectedTask(task)}
      {...(overlay ? {} : { ...attributes, ...listeners })}
    >
      {/* 제목 */}
      <p className={taskCardStyles.title}>{task.title}</p>

      {/* 메타 정보 */}
      <div className={taskCardStyles.meta}>
        <DueDateBadge dueDate={task.dueDate} isDone={task.status === 'done'} />
        <span className={taskCardStyles.priority}>P{task.priority}</span>
      </div>
    </div>
  )
}
