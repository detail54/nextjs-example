'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { COMMON_MSG } from '@/context/messages/commonMsg'
import InlineEdit from '@/components/inline-edit/InlineEdit'
import SelectBox from '@/components/select/SelectBox'
import DatePicker from '@/components/datepicker/DatePicker'
import ColorPicker from '@/components/colorpicker/ColorPicker'
import { useTaskUpdate, useTaskDelete } from '../hooks/useTask'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useTaskPanelStore } from '@/stores/useTaskPanelStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { BoardTask } from '@/features/common/api/type'
import type { TaskStatus } from '@/server/core/db/type'
import { boardTaskDetailStyles, TASK_STATUS_LABEL } from './BoardTaskDetail.styles'

// 상태 SelectBox 옵션 목록
const TASK_STATUS_OPTIONS = (Object.keys(TASK_STATUS_LABEL) as TaskStatus[]).map((key) => ({
  value: key,
  label: TASK_STATUS_LABEL[key],
}))

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

  const { isAdmin } = useAuth()
  const { mutate: update } = useTaskUpdate()
  const { mutate: deleteTask } = useTaskDelete()
  const { openConfirmModal } = useConfirmModalStore()
  const { closePanel } = useTaskPanelStore()

  // 삭제 확인 모달 열기
  const handleDeleteClick = () => {
    openConfirmModal({
      type: 'confirm',
      title: COMMON_MSG.TASK_DELETE_CONFIRM_TITLE,
      description: COMMON_MSG.TASK_DELETE_CONFIRM_DESC,
      confirmLabel: COMMON_MSG.TASK_DELETE_CONFIRM,
      variant: 'danger',
      onConfirm: () => {
        deleteTask(task.id, { onSuccess: closePanel })
      },
    })
  }

  const handleTitleSave = (title: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, title }))
    update({
      id: task.id,
      title,
      description: localTask.description ?? undefined,
      status: localTask.status,
      startDate: localTask.startDate,
      dueDate: localTask.dueDate,
    })
  }

  const handleDescriptionSave = (description: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, description }))
    update({
      id: task.id,
      title: localTask.title,
      description,
      status: localTask.status,
      startDate: localTask.startDate,
      dueDate: localTask.dueDate,
    })
  }

  const handleStatusChange = (status: TaskStatus) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, status }))
    update({
      id: task.id,
      title: localTask.title,
      description: localTask.description ?? undefined,
      status,
      startDate: localTask.startDate,
      dueDate: localTask.dueDate,
    })
  }

  const handleStartDateChange = (startDate: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, startDate: startDate || null }))
    update({
      id: task.id,
      title: localTask.title,
      description: localTask.description ?? undefined,
      status: localTask.status,
      startDate: startDate || null,
      dueDate: localTask.dueDate,
    })
  }

  const handleDueDateChange = (dueDate: string) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, dueDate: dueDate || null }))
    update({
      id: task.id,
      title: localTask.title,
      description: localTask.description ?? undefined,
      status: localTask.status,
      startDate: localTask.startDate,
      dueDate: dueDate || null,
    })
  }

  const handleColorChange = (color: string | null) => {
    // 낙관적 업데이트: 즉시 반영
    setLocalTask((prev) => ({ ...prev, color }))
    update({
      id: task.id,
      title: localTask.title,
      description: localTask.description ?? undefined,
      status: localTask.status,
      startDate: localTask.startDate,
      dueDate: localTask.dueDate,
      color,
    })
  }

  return (
    <div className={boardTaskDetailStyles.wrapper}>
      {/* 제목 */}
      <div className={boardTaskDetailStyles.section}>
        <InlineEdit
          value={localTask.title}
          onSave={handleTitleSave}
          emptyText={BOARD_MSG.TASK_TITLE_EMPTY}
          textClassName='text-base font-semibold'
        />
      </div>

      {/* 상태 선택 */}
      <div className={boardTaskDetailStyles.section}>
        <p className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_STATUS_LABEL}</p>
        <SelectBox
          value={localTask.status}
          options={TASK_STATUS_OPTIONS}
          onChange={(val) => handleStatusChange(val as TaskStatus)}
        />
      </div>

      {/* 시작일 선택 */}
      <div className={boardTaskDetailStyles.section}>
        <p className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_START_DATE_LABEL}</p>
        <DatePicker value={localTask.startDate ?? ''} onChange={handleStartDateChange} />
      </div>

      {/* 마감일 선택 */}
      <div className={boardTaskDetailStyles.section}>
        <p className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_DUE_DATE_LABEL}</p>
        <DatePicker value={localTask.dueDate ?? ''} onChange={handleDueDateChange} />
      </div>

      {/* 색상 선택 */}
      <div className={boardTaskDetailStyles.section}>
        <p className={boardTaskDetailStyles.sectionLabel}>{BOARD_MSG.TASK_COLOR_LABEL}</p>
        <ColorPicker value={localTask.color} onChange={handleColorChange} />
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

      {/* 삭제 버튼 (관리자만 표시) */}
      {isAdmin && (
        <div className={boardTaskDetailStyles.deleteSection}>
          <button type='button' className={boardTaskDetailStyles.deleteButton} onClick={handleDeleteClick}>
            <Trash2 size={14} />
            {BOARD_MSG.TASK_DELETE}
          </button>
        </div>
      )}
    </div>
  )
}
