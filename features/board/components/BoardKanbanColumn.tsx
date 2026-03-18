'use client'

import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import type { TaskStatus } from '@/server/db/type'
import type { BoardTask } from '../api/type'
import BoardTaskCard from './BoardTaskCard'
import BoardTaskCreateInput from './BoardTaskCreateInput'
import { kanbanColumnStyles, COLUMN_BG } from './BoardKanbanColumn.styles'
import { boardTaskCreateInputStyles } from './BoardTaskCreateInput.styles'

// 컬럼 헤더 레이블 매핑
const COLUMN_LABEL: Record<TaskStatus, string> = {
  todo: BOARD_MSG.COLUMN_TODO,
  in_progress: BOARD_MSG.COLUMN_IN_PROGRESS,
  done: BOARD_MSG.COLUMN_DONE,
}

type Props = {
  status: TaskStatus
  tasks: BoardTask[]
  epicId: number
}

// 칸반 컬럼 (droppable + sortable)
export default function BoardKanbanColumn({ status, tasks, epicId }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  // todo 컬럼 인라인 생성 UI 표시 여부
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div
      ref={setNodeRef}
      className={`${kanbanColumnStyles.container({ isOver })} ${COLUMN_BG[status]}`}
    >
      {/* 컬럼 헤더 */}
      <div className={kanbanColumnStyles.header}>
        <span className={kanbanColumnStyles.title({ status })}>{COLUMN_LABEL[status]}</span>
        <span className={kanbanColumnStyles.count({ status })}>{tasks.length}</span>
      </div>

      {/* task 목록 */}
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className={kanbanColumnStyles.taskList}>
          {tasks.length === 0 && !isCreating ? (
            <p className={kanbanColumnStyles.empty}>{BOARD_MSG.EMPTY_COLUMN}</p>
          ) : (
            tasks.map((task) => <BoardTaskCard key={task.id} task={task} />)
          )}
        </div>
      </SortableContext>

      {/* todo 컬럼 하단 - 인라인 생성 UI */}
      {status === 'todo' && (
        <div className={kanbanColumnStyles.footer}>
          {isCreating ? (
            <BoardTaskCreateInput
              epicId={epicId}
              onSuccess={() => setIsCreating(false)}
              onCancel={() => setIsCreating(false)}
            />
          ) : (
            <button
              type='button'
              className={boardTaskCreateInputStyles.createButton}
              onClick={() => setIsCreating(true)}
            >
              <Plus className='h-3.5 w-3.5' />
              {BOARD_MSG.TASK_CREATE}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
