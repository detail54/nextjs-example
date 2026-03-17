'use client'

import { useState } from 'react'
import { BOARD_MSG } from '@/context/boardMsg'
import { useEpicCreate } from '../hooks/useEpicCreate'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import { boardEpicFormStyles } from './BoardEpicForm.styles'

interface BoardEpicFormProps {
  onSuccess?: () => void
}

// 에픽 등록 폼
export default function BoardEpicForm({ onSuccess }: BoardEpicFormProps) {
  // 에픽명
  const [title, setTitle] = useState('')
  // 설명
  const [description, setDescription] = useState('')

  const { mutate: createEpic, isPending } = useEpicCreate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

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
          {BOARD_MSG.EPIC_SUBMIT}
        </BasicButton>
      </div>
    </form>
  )
}
