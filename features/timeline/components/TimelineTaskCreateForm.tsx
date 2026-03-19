'use client'

import { type FormEvent, useState } from 'react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { useTaskCreate } from '@/features/board/hooks/useTask'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import DatePicker from '@/components/datepicker/DatePicker'
import { timelineTaskCreateFormStyles } from './TimelineTaskCreateForm.styles'

interface TimelineTaskCreateFormProps {
  // 태스크를 등록할 에픽 ID
  epicId: number
  onSuccess?: () => void
}

// 타임라인 하위 작업 등록 폼
export default function TimelineTaskCreateForm({ epicId, onSuccess }: TimelineTaskCreateFormProps) {
  // 태스크명
  const [title, setTitle] = useState('')
  // 시작일 (YYYY-MM-DD)
  const [startDate, setStartDate] = useState('')
  // 마감일 (YYYY-MM-DD)
  const [dueDate, setDueDate] = useState('')

  const { mutate: createTask, isPending } = useTaskCreate(epicId)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    createTask(
      {
        title: title.trim(),
        startDate: startDate || null,
        dueDate: dueDate || null,
      },
      {
        onSuccess: () => {
          setTitle('')
          setStartDate('')
          setDueDate('')
          onSuccess?.()
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className={timelineTaskCreateFormStyles.form}>
      {/* 태스크명 입력 */}
      <div className={timelineTaskCreateFormStyles.field}>
        <label className={timelineTaskCreateFormStyles.label}>
          {TIMELINE_MSG.TASK_TITLE_LABEL}
          <span className={timelineTaskCreateFormStyles.required}>*</span>
        </label>
        <BasicInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={TIMELINE_MSG.TASK_TITLE_PLACEHOLDER}
          maxLength={100}
        />
      </div>

      {/* 시작일 선택 */}
      <div className={timelineTaskCreateFormStyles.field}>
        <label className={timelineTaskCreateFormStyles.label}>
          {TIMELINE_MSG.TASK_START_DATE_LABEL}
        </label>
        <DatePicker value={startDate} onChange={setStartDate} />
      </div>

      {/* 마감일 선택 */}
      <div className={timelineTaskCreateFormStyles.field}>
        <label className={timelineTaskCreateFormStyles.label}>
          {TIMELINE_MSG.TASK_DUE_DATE_LABEL}
        </label>
        <DatePicker value={dueDate} onChange={setDueDate} />
      </div>

      {/* 제출 버튼 */}
      <div className={timelineTaskCreateFormStyles.actions}>
        <BasicButton
          type='submit'
          variant='primary'
          size='md'
          disabled={isPending || !title.trim()}
        >
          {TIMELINE_MSG.TASK_SUBMIT}
        </BasicButton>
      </div>
    </form>
  )
}
