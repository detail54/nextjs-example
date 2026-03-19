// 타임라인 레이아웃 상수
export const MONTH_WIDTH = 120 // 월 컬럼 너비 (px)
export const MONTHS_BEFORE = 12 // 현재 월 이전 표시 개수
export const MONTHS_AFTER = 24 // 현재 월 이후 표시 개수
export const TOTAL_MONTHS = MONTHS_BEFORE + 1 + MONTHS_AFTER // 37개월
export const LEFT_WIDTH = 280 // 왼쪽 에픽 리스트 너비 (px)
export const EPIC_ROW_HEIGHT = 48 // 에픽 행 높이 (px)
export const TASK_ROW_HEIGHT = 40 // 태스크 행 높이 (px)

// 타임라인 시작 날짜 (현재 월 기준 MONTHS_BEFORE개월 전 첫째 날)
export function getTimelineStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - MONTHS_BEFORE, 1)
}

// 표시할 월 목록 생성
export function getMonthList(): Array<{
  year: number
  month: number // 0-based
  label: string
  isCurrent: boolean
}> {
  const start = getTimelineStart()
  const now = new Date()

  return Array.from({ length: TOTAL_MONTHS }, (_, i) => {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1)
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      label: `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`,
      isCurrent: d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth(),
    }
  })
}

// 날짜 문자열(YYYY-MM-DD) → x 픽셀 오프셋 (타임라인 시작 기준)
export function dateToX(dateStr: string): number {
  const start = getTimelineStart()
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)

  // 타임라인 시작과의 월 차이
  const monthDiff =
    (date.getFullYear() - start.getFullYear()) * 12 + (date.getMonth() - start.getMonth())
  // 해당 월의 날짜 수
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  // 월 내 일자 (0-indexed)
  const dayInMonth = date.getDate() - 1

  return monthDiff * MONTH_WIDTH + (dayInMonth / daysInMonth) * MONTH_WIDTH
}

// 오늘 날짜의 x 오프셋
export function getTodayX(): number {
  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return dateToX(dateStr)
}

// 날짜 문자열(YYYY-MM-DD) → YYYY.MM.DD 포맷
function formatDate(dateStr: string): string {
  return dateStr.replace(/-/g, '.')
}

// 두 날짜 간 총 일수 (당일 포함)
export function calcDays(startDate: string, dueDate: string): number {
  const start = new Date(startDate)
  const end = new Date(dueDate)
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

// 바 툴팁 텍스트 생성 (기간 + 총 일수)
export function formatBarTooltip(
  startDate: string | null | undefined,
  dueDate: string | null | undefined,
): string {
  const start = startDate ? formatDate(startDate) : null
  const end = dueDate ? formatDate(dueDate) : null
  const range = start && end ? `${start} ~ ${end}` : start ? `${start} ~` : `~ ${end}`
  const days = startDate && dueDate ? ` · ${calcDays(startDate, dueDate)}일` : ''
  return `${range}${days}`
}

// 바(bar) 위치 계산 - 타임라인 범위 내로 클리핑
export function calcBarPosition(
  startDate: string | null,
  dueDate: string | null,
): { left: number; width: number } | null {
  if (!startDate && !dueDate) return null

  const totalWidth = TOTAL_MONTHS * MONTH_WIDTH
  const left = startDate ? Math.max(0, dateToX(startDate)) : 0
  // 마감일 끝 = 해당 날짜의 끝 (약 1일분 너비 추가)
  const rightRaw = dueDate ? dateToX(dueDate) + MONTH_WIDTH / 30 : totalWidth
  const right = Math.min(totalWidth, rightRaw)
  const width = Math.max(8, right - left)

  // 타임라인 범위 완전 벗어나면 null
  if (left >= totalWidth || right <= 0) return null

  return { left, width }
}
