'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { datePickerStyles } from './DatePicker.styles'

// 요일 헤더
const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const

type DatePickerProps = {
  /** 날짜 값 (YYYY-MM-DD 형식, 빈 문자열이면 미선택) */
  value: string
  /** 날짜 변경 콜백 */
  onChange: (value: string) => void
  /** 미선택 시 표시 텍스트 */
  placeholder?: string
  disabled?: boolean
}

/** YYYY-MM-DD → Date 객체 */
function parseDate(value: string): Date | null {
  if (!value) return null
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Date → YYYY-MM-DD 문자열 */
function formatValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** 표시용 날짜 포맷 (예: 2026년 3월 18일) */
function formatDisplay(value: string): string {
  const date = parseDate(value)
  if (!date) return ''
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

/** 해당 월의 날짜 그리드 생성 (앞뒤 빈칸 포함) */
function buildCalendarGrid(year: number, month: number) {
  // month: 0-based
  const firstDay = new Date(year, month, 1).getDay() // 0=일
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: Array<{ date: Date | null; outside: boolean }> = []

  // 이전 달 빈 셀
  for (let i = 0; i < firstDay; i++) {
    cells.push({ date: null, outside: true })
  }
  // 현재 달 날짜
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), outside: false })
  }
  // 마지막 주 나머지 빈 셀
  const remainder = cells.length % 7
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      cells.push({ date: null, outside: true })
    }
  }

  return cells
}

// 날짜 선택 공통 컴포넌트
export default function DatePicker({
  value,
  onChange,
  placeholder = '날짜 선택',
  disabled,
}: DatePickerProps) {
  // 캘린더 열림 여부
  const [isOpen, setIsOpen] = useState(false)

  // 현재 표시 중인 월 (0-based)
  const today = new Date()
  const initialDate = parseDate(value) ?? today
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())

  const containerRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  // 캘린더 그리드 계산
  const cells = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth])

  const selectedDate = parseDate(value)

  // 날짜 선택
  const handleSelectDate = (date: Date) => {
    onChange(formatValue(date))
    setIsOpen(false)
  }

  // 이전 달
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  // 다음 달
  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  // 캘린더 열 때 선택된 날짜 기준 월로 이동
  const handleOpen = () => {
    if (disabled) return
    const base = parseDate(value) ?? today
    setViewYear(base.getFullYear())
    setViewMonth(base.getMonth())
    setIsOpen(true)
  }

  /** 셀의 상태 결정 */
  const getCellState = (date: Date | null, outside: boolean) => {
    if (!date || outside) return 'empty'
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    const isSelected =
      selectedDate !== null &&
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()

    if (isSelected && isToday) return 'todaySelected'
    if (isSelected) return 'selected'
    if (isToday) return 'today'
    return 'default'
  }

  return (
    <div ref={containerRef} className={datePickerStyles.container}>
      {/* 트리거 버튼 */}
      <button
        type='button'
        className={datePickerStyles.trigger({ hasValue: !!value })}
        onClick={handleOpen}
        disabled={disabled}
        aria-haspopup='dialog'
        aria-expanded={isOpen}
      >
        <CalendarDays size={14} className='shrink-0 text-secondary-400' />
        <span>{value ? formatDisplay(value) : placeholder}</span>
      </button>

      {/* 캘린더 패널 */}
      {isOpen && (
        <div className={datePickerStyles.panel} role='dialog' aria-label='날짜 선택'>
          {/* 월 이동 헤더 */}
          <div className={datePickerStyles.header}>
            <button
              type='button'
              className={datePickerStyles.navButton}
              onClick={handlePrevMonth}
              aria-label='이전 달'
            >
              <ChevronLeft size={14} />
            </button>
            <span className={datePickerStyles.monthLabel}>
              {viewYear}년 {viewMonth + 1}월
            </span>
            <button
              type='button'
              className={datePickerStyles.navButton}
              onClick={handleNextMonth}
              aria-label='다음 달'
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* 요일 헤더 */}
          <div className={datePickerStyles.dayHeaders}>
            {DAY_LABELS.map((label) => (
              <div key={label} className={datePickerStyles.dayLabel}>
                {label}
              </div>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className={datePickerStyles.daysGrid}>
            {cells.map((cell, idx) => {
              const state = getCellState(cell.date, cell.outside)
              if (state === 'empty') {
                return <div key={idx} />
              }
              return (
                <button
                  key={idx}
                  type='button'
                  className={datePickerStyles.dayCell({ state })}
                  onClick={() => cell.date && handleSelectDate(cell.date)}
                >
                  {cell.date?.getDate()}
                </button>
              )
            })}
          </div>

          {/* 초기화 버튼 (값이 있을 때만) */}
          {value && (
            <div className={datePickerStyles.footer}>
              <button
                type='button'
                className={datePickerStyles.clearButton}
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
              >
                날짜 초기화
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
