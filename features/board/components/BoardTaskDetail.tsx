'use client'

import { useState } from 'react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import InlineEdit from '@/components/inline-edit/InlineEdit'
import { useTaskUpdate } from '../hooks/useTask'
import type { BoardTask } from '../api/type'
import {
  boardTaskDetailStyles,
  taskStatusBadge,
  TASK_STATUS_LABEL,
} from './BoardTaskDetail.styles'

interface BoardTaskDetailProps {
  task: BoardTask
}

// 태스크 상세보기 패널 콘텐츠
export default function BoardTaskDetail({ task }: BoardTaskDetailProps) {
  // 낙관적 업데이트용 로컬 상태
  const [localTask, setLocalTask] = useState(task)

  // task prop 변경 시 (쿼리 갱신 후) 로컬 상태 동기화
  const [prevTask, setPrevTask] = useState(task)
  if (task !== prevTask) {
    setPrevTask(task)
    setLocalTask(task)
  }

  const { mutate: update } = useTaskUpdate()

  const handleTitleSave = (title: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, title }))
    update({ id: task.id, title, description: localTask.description ?? undefined })
  }

  const handleDescriptionSave = (description: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, description }))
    update({ id: task.id, title: localTask.title, description })
  }

  return (
    <div className={boardTaskDetailStyles.wrapper}>
      {/* 상태 배지 */}
      <div className={boardTaskDetailStyles.statusRow}>
        <span className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_STATUS_LABEL}</span>
        <span className={taskStatusBadge({ status: localTask.status })}>
          {TASK_STATUS_LABEL[localTask.status]}
        </span>
      </div>

      {/* 제목 */}
      <div className={boardTaskDetailStyles.section}>
        <InlineEdit
          value={localTask.title}
          onSave={handleTitleSave}
          emptyText={BOARD_MSG.TASK_TITLE_EMPTY}
          textClassName='text-base font-semibold'
        />
      </div>

      {/* 설명 */}
      <div className={boardTaskDetailStyles.section}>
        <p className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_DESCRIPTION_LABEL}</p>
        <InlineEdit
          value={localTask.description ?? ''}
          onSave={handleDescriptionSave}
          multiline
          emptyText={BOARD_MSG.TASK_DESCRIPTION_EMPTY}
        />
      </div>
    </div>
  )
}
