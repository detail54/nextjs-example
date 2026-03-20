'use client'

import { useState } from 'react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { EPIC_STATUS } from '@/context/constants'
import { useEpicCreate, useEpicUpdate } from '../hooks/useEpic'
import type { EpicWithTasks } from '@/features/common/api/type'
import type { EpicStatus } from '@/server/db/type'
import type { SelectOption } from '@/components/select/SelectBox'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import SelectBox from '@/components/select/SelectBox'
import DatePicker from '@/components/datepicker/DatePicker'
import ColorPicker from '@/components/colorpicker/ColorPicker'
import { boardEpicFormStyles } from './BoardEpicForm.styles'

// 에픽 상태 옵션 목록
const EPIC_STATUS_OPTIONS: SelectOption[] = [
  { value: EPIC_STATUS.ACTIVE, label: BOARD_MSG.EPIC_STATUS_ACTIVE },
  { value: EPIC_STATUS.INACTIVE, label: BOARD_MSG.EPIC_STATUS_INACTIVE },
  { value: EPIC_STATUS.COMPLETED, label: BOARD_MSG.EPIC_STATUS_COMPLETED },
]

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
  // 상태
  const [status, setStatus] = useState<EpicStatus>(epic?.status ?? EPIC_STATUS.ACTIVE)
  // 시작일 (YYYY-MM-DD 형식)
  const [startDate, setStartDate] = useState(epic?.startDate ?? '')
  // 마감일 (YYYY-MM-DD 형식)
  const [dueDate, setDueDate] = useState(epic?.dueDate ?? '')
  // 색상 (hex 문자열)
  const [color, setColor] = useState<string | null>(epic?.color ?? null)

  const { mutate: createEpic, isPending: isCreating } = useEpicCreate()
  const { mutate: updateEpic, isPending: isUpdating } = useEpicUpdate()
  const isPending = isCreating || isUpdating

  const isEditMode = !!epic

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim()) return

    if (isEditMode) {
      updateEpic(
        {
          id: epic.id,
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          startDate: startDate || null,
          dueDate: dueDate || null,
          color,
        },
        { onSuccess: () => onSuccess?.() },
      )
    } else {
      createEpic(
        {
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          startDate: startDate || null,
          dueDate: dueDate || null,
          color,
        },
        {
          onSuccess: () => {
            setTitle('')
            setDescription('')
            setStatus(EPIC_STATUS.ACTIVE)
            setStartDate('')
            setDueDate('')
            setColor(null)
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

      {/* 상태 선택 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>{BOARD_MSG.EPIC_STATUS_LABEL}</label>
        <SelectBox
          value={status}
          options={EPIC_STATUS_OPTIONS}
          onChange={(val) => setStatus(val as EpicStatus)}
        />
      </div>

      {/* 시작일 선택 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>{BOARD_MSG.EPIC_START_DATE_LABEL}</label>
        <DatePicker value={startDate} onChange={setStartDate} />
      </div>

      {/* 마감일 선택 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>{BOARD_MSG.EPIC_DUE_DATE_LABEL}</label>
        <DatePicker value={dueDate} onChange={setDueDate} />
      </div>

      {/* 색상 선택 */}
      <div className={boardEpicFormStyles.field}>
        <label className={boardEpicFormStyles.label}>{BOARD_MSG.EPIC_COLOR_LABEL}</label>
        <ColorPicker value={color} onChange={setColor} />
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
