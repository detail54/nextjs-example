'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTaskPanelStore } from '@/stores/useTaskPanelStore'
import DueDateBadge from '@/components/due-date-badge/DueDateBadge'
import type { BoardTask, Assignee } from '@/features/common/api/type'
import { taskCardStyles } from './BoardTaskCard.styles'
import { TASK_STATUS } from '@/context/constants'
import AssigneeSelector from './AssigneeSelector'
import { useAllUsers } from '@/features/common/hooks/useAllUsers'
import { useTaskAssigneesUpdate } from '../hooks/useTask'

type Props = {
  task: BoardTask
  // DragOverlay용 렌더링 여부 (true이면 useSortable 없이 단순 렌더링)
  overlay?: boolean
}

// 드래그 가능한 task 카드
export default function BoardTaskCard({ task, overlay = false }: Props) {
  const { openTaskDetail } = useTaskPanelStore()
  const { data: allUsers = [] } = useAllUsers()
  const { mutate: updateAssignees } = useTaskAssigneesUpdate()

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

  const handleAssigneesChange = (newAssignees: Assignee[]) => {
    updateAssignees({ taskId: task.id, userIds: newAssignees.map((a) => a.id) })
  }

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={taskCardStyles.card({ isDragging: !overlay && isDragging, isOverlay: overlay })}
      onClick={overlay ? undefined : () => openTaskDetail(task)}
      {...(overlay ? {} : { ...attributes, ...listeners })}
    >
      {/* 제목 */}
      <p className={taskCardStyles.title}>{task.title}</p>

      {/* 메타 정보 */}
      <div className={taskCardStyles.meta}>
        {/* 담당자 영역: 클릭 시 드래그·패널 오픈 차단 후 드롭다운 노출 */}
        {!overlay && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <AssigneeSelector
              assignees={task.assignees}
              allUsers={allUsers}
              onChange={handleAssigneesChange}
              compact
            />
          </div>
        )}

        {/* 마감일 배지 */}
        <DueDateBadge dueDate={task.dueDate} isDone={task.status === TASK_STATUS.DONE} />

        {/* 우선순위 */}
        <span className={taskCardStyles.priority}>P{task.priority}</span>
      </div>
    </div>
  )
}
