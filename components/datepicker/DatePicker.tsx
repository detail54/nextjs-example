'use client'

import { datePickerStyles } from './DatePicker.styles'

type DatePickerProps = {
  /** 날짜 값 (YYYY-MM-DD 형식) */
  value: string
  /** 날짜 변경 콜백 */
  onChange: (value: string) => void
  disabled?: boolean
}

// 날짜 선택 공통 컴포넌트
export default function DatePicker({ value, onChange, disabled }: DatePickerProps) {
  return (
    <input
      type='date'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={datePickerStyles.input}
    />
  )
}
