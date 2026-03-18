'use client'

import { useState } from 'react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useEpicCreate, useEpicUpdate } from '../hooks/useEpic'
import type { EpicWithTasks } from '../api/type'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import { boardEpicFormStyles } from './BoardEpicForm.styles'

interface BoardEpicFormProps {
  // epic이 있으면 수정 모드
  epic?: EpicWithTasks
  onSuccess?: () => void
}

// 에픽 등록/수정 폼
export default function BoardEpicForm({ epic, onSuccess }: BoardEpicFormProps) {
  // 에픽명
  const [title, setTitle] = useState(epic?.title ?? '')
  // 설명
  const [description, setDescription] = useState(epic?.description ?? '')

  const { mutate: createEpic, isPending: isCreating } = useEpicCreate()
  const { mutate: updateEpic, isPending: isUpdating } = useEpicUpdate()
  const isPending = isCreating || isUpdating

  const isEditMode = !!epic

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    if (isEditMode) {
      updateEpic(
        { id: epic.id, title: title.trim(), description: description.trim() || undefined },
        { onSuccess: () => onSuccess?.() },
      )
    } else {
      createEpic(
        { title: title.trim(), description: description.trim() || undefined },
        {
          onSuccess: () => {
            setTitle('')
            setDescription('')
            onSuccess?.()
          },
        },
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className={boardEpicFormStyles.form}>
      {/* 에픽명 입력 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>
          {BOARD_MSG.EPIC_TITLE_LABEL}
          <span className={boardEpicFormStyles.required}>*</span>
        </label>
        <BasicInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={BOARD_MSG.EPIC_TITLE_PLACEHOLDER}
          maxLength={100}
        />
      </div>

      {/* 설명 입력 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>{BOARD_MSG.EPIC_DESCRIPTION_LABEL}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={BOARD_MSG.EPIC_DESCRIPTION_PLACEHOLDER}
          className={boardEpicFormStyles.textarea}
          rows={5}
          maxLength={500}
        />
      </div>

      {/* 제출 버튼 */}
      <div className={boardEpicFormStyles.actions}>
        <BasicButton
          type='submit'
          variant='primary'
          size='md'
          disabled={isPending || !title.trim()}
        >
          {isEditMode ? BOARD_MSG.EPIC_UPDATE_SUBMIT : BOARD_MSG.EPIC_SUBMIT}
        </BasicButton>
      </div>
    </form>
  )
}
