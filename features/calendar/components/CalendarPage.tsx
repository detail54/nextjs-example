'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import { CALENDAR_MSG } from '@/context/messages/calendarMsg'
import { COMMON_MSG } from '@/context/messages/commonMsg'
import { EPIC_STATUS } from '@/context/constants'
import { useBoardQuery } from '@/features/board/hooks/useBoardQuery'
import { useEpicUpdate } from '@/features/board/hooks/useEpic'
import type { EpicWithTasks } from '@/features/common/api/type'
import Tooltip from '@/components/tooltip/Tooltip'
import ColorPicker from '@/components/colorpicker/ColorPicker'
import { formatBarTooltip } from '@/features/timeline/utils/timelineUtils'
import { calendarStyles as s } from './CalendarPage.styles'

// ---- 상수 ----

// 한 날짜에 표시할 최대 에픽 수 (초과 시 더보기)
const MAX_VISIBLE_EPICS = 4
// 주 행 고정 높이 (px) = DAY_NUM_AREA + 4*(BAR_HEIGHT+BAR_GAP) + 더보기 영역 + 하단 여백
const CELL_HEIGHT = 160
// 날짜 숫자 영역 높이 (날짜 숫자 + 하단 여백 포함, px)
const DAY_NUM_AREA = 42
// 에픽 바 높이 (px)
const BAR_HEIGHT = 20
// 에픽 바 간 간격 (px)
const BAR_GAP = 4

// 에픽 상태별 기본 배경색 (커스텀 색상 없을 때)
const STATUS_COLORS: Record<string, string> = {
  [EPIC_STATUS.ACTIVE]: '#7c3aed', // primary-600
  [EPIC_STATUS.INACTIVE]: '#64748b', // secondary-500
  [EPIC_STATUS.COMPLETED]: '#059669', // success-600
}

// ---- 날짜 유틸 ----

// Date → YYYY-MM-DD 문자열
function dateToStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 해당 연월의 캘린더 주 배열 반환 (일요일 시작)
function getCalendarWeeks(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // 첫 날이 속한 주의 일요일
  const start = new Date(firstDay)
  start.setDate(start.getDate() - start.getDay())

  // 마지막 날이 속한 주의 토요일
  const end = new Date(lastDay)
  end.setDate(end.getDate() + (6 - end.getDay()))

  const weeks: Date[][] = []
  const cur = new Date(start)

  while (cur <= end) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cur))
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
  }

  return weeks
}

// ---- 에픽 배치 로직 ----

interface EpicPlacement {
  epic: EpicWithTasks
  startCol: number // 이번 주 내 시작 열 (0-6)
  endCol: number // 이번 주 내 종료 열 (0-6)
  lane: number // 표시 슬롯 인덱스 (0-based)
  continuesLeft: boolean // 이전 주에서 이어지는 경우
  continuesRight: boolean // 다음 주로 이어지는 경우
}

// 주어진 주(weekDays)에 대해 에픽 슬롯(lane) 배치 계산
function assignLanesForWeek(epics: EpicWithTasks[], weekDays: Date[]): EpicPlacement[] {
  const weekStart = new Date(weekDays[0].getFullYear(), weekDays[0].getMonth(), weekDays[0].getDate())
  const weekEnd = new Date(weekDays[6].getFullYear(), weekDays[6].getMonth(), weekDays[6].getDate())

  // 이번 주와 겹치는 에픽 필터
  const overlapping = epics.filter((epic) => {
    const es = epic.startDate ? new Date(epic.startDate) : null
    const ee = epic.dueDate ? new Date(epic.dueDate) : null
    if (!es && !ee) return false
    const effStart = es || ee!
    const effEnd = ee || es!
    return effStart <= weekEnd && effEnd >= weekStart
  })

  // 시작일 오름차순, 동점 시 기간 긴 것 우선
  overlapping.sort((a, b) => {
    const as = a.startDate ? new Date(a.startDate).getTime() : 0
    const bs = b.startDate ? new Date(b.startDate).getTime() : 0
    if (as !== bs) return as - bs
    const ae = a.dueDate ? new Date(a.dueDate).getTime() : Infinity
    const be = b.dueDate ? new Date(b.dueDate).getTime() : Infinity
    return be - ae
  })

  const placements: EpicPlacement[] = []
  // 슬롯별 열 점유 여부 [lane][col]
  const laneOccupied: boolean[][] = []

  for (const epic of overlapping) {
    const es = epic.startDate ? new Date(epic.startDate) : null
    const ee = epic.dueDate ? new Date(epic.dueDate) : null
    const effStart = es || ee!
    const effEnd = ee || es!

    const continuesLeft = effStart < weekStart
    const continuesRight = effEnd > weekEnd

    // 이번 주 범위로 클램핑
    const clampedStart = continuesLeft ? weekStart : effStart
    const clampedEnd = continuesRight ? weekEnd : effEnd

    // 열 인덱스 계산
    const sc = Math.max(
      0,
      Math.min(6, Math.round((clampedStart.getTime() - weekStart.getTime()) / 86400000)),
    )
    const ec = Math.max(
      0,
      Math.min(6, Math.round((clampedEnd.getTime() - weekStart.getTime()) / 86400000)),
    )

    // 가장 낮은 사용 가능한 슬롯 탐색
    let lane = 0
    while (lane <= 20) {
      if (!laneOccupied[lane]) laneOccupied[lane] = new Array(7).fill(false)
      const available = !laneOccupied[lane].slice(sc, ec + 1).some(Boolean)
      if (available) {
        for (let d = sc; d <= ec; d++) laneOccupied[lane][d] = true
        placements.push({ epic, startCol: sc, endCol: ec, lane, continuesLeft, continuesRight })
        break
      }
      lane++
    }
  }

  return placements
}

// 일별 오버플로우 에픽 수 계산 (lane >= MAX_VISIBLE_EPICS)
function getOverflowByDay(placements: EpicPlacement[]): number[] {
  const overflow = new Array(7).fill(0)
  for (const p of placements) {
    if (p.lane >= MAX_VISIBLE_EPICS) {
      for (let d = p.startCol; d <= p.endCol; d++) overflow[d]++
    }
  }
  return overflow
}

// 특정 열(dayCol)에 해당하는 모든 에픽 반환 (lane 오름차순)
function getEpicsForDay(placements: EpicPlacement[], dayCol: number): EpicWithTasks[] {
  return placements
    .filter((p) => p.startCol <= dayCol && p.endCol >= dayCol)
    .sort((a, b) => a.lane - b.lane)
    .map((p) => p.epic)
}

// 에픽 배경색 반환 (커스텀 > 상태 기본색)
function getEpicColor(epic: EpicWithTasks): string {
  return epic.color || STATUS_COLORS[epic.status] || STATUS_COLORS[EPIC_STATUS.ACTIVE]
}

// 날짜 숫자 셀 className 계산
function getDayNumClass(day: Date, currentMonth: number, todayStr: string): string {
  const isToday = dateToStr(day) === todayStr
  const isCurrentMonth = day.getMonth() === currentMonth
  const isSun = day.getDay() === 0
  const isSat = day.getDay() === 6
  const base = 'w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium'

  if (isToday) return `${base} bg-primary-500 text-white`
  if (!isCurrentMonth) return `${base} text-secondary-600`
  if (isSun) return `${base} text-danger-400`
  if (isSat) return `${base} text-primary-400`
  return `${base} text-secondary-300`
}

// ---- 내부 팝오버 컴포넌트 ----

// 색상 선택 팝오버 (portal)
function ColorPopover({
  x,
  y,
  epic,
  onClose,
  onChange,
}: {
  x: number
  y: number
  epic: EpicWithTasks
  onClose: () => void
  onChange: (epic: EpicWithTasks, color: string | null) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지 → 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return createPortal(
    <div
      ref={ref}
      className='fixed z-[10000] rounded-lg bg-secondary-800 border border-secondary-600 shadow-xl p-3 w-[332px]'
      style={{ left: x, top: y, transform: 'translate(-50%, -110%)' }}
    >
      <ColorPicker
        value={epic.color}
        onChange={(color) => {
          onChange(epic, color)
          onClose()
        }}
      />
    </div>,
    document.body,
  )
}

// 더보기 팝오버 (portal)
function MorePopover({
  x,
  y,
  dateLabel,
  epics,
  onClose,
  onEpicClick,
}: {
  x: number
  y: number
  dateLabel: string
  epics: EpicWithTasks[]
  onClose: () => void
  onEpicClick: (epic: EpicWithTasks, x: number, y: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지 → 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return createPortal(
    <div
      ref={ref}
      className='fixed z-[9999] rounded-lg bg-secondary-800 border border-secondary-600 shadow-xl p-3 min-w-[200px] max-w-[280px]'
      style={{ left: x, top: y, transform: 'translate(-50%, 8px)' }}
    >
      <p className='text-xs font-medium text-secondary-400 mb-2'>{dateLabel}</p>
      <div className='flex flex-col gap-1.5'>
        {epics.map((epic) => (
          <Tooltip key={epic.id} content={formatBarTooltip(epic.startDate, epic.dueDate)}>
            <div
              className='h-5 rounded text-xs text-white px-2 flex items-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-150'
              style={{ backgroundColor: getEpicColor(epic) }}
              onClick={(e) => {
                e.stopPropagation()
                onEpicClick(epic, e.clientX, e.clientY)
              }}
            >
              <span className='truncate'>{epic.title}</span>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>,
    document.body,
  )
}

// ---- 메인 컴포넌트 ----

export default function CalendarPage() {
  const today = new Date()
  const todayStr = dateToStr(today)

  // 현재 표시 연월 상태
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth()) // 0-based

  // 색상 변경 팝오버 상태 (epic + 클릭 좌표)
  const [colorPopover, setColorPopover] = useState<{
    epic: EpicWithTasks
    x: number
    y: number
  } | null>(null)

  // 더보기 팝오버 상태 (해당 날의 에픽 목록 + 좌표)
  const [morePopover, setMorePopover] = useState<{
    epics: EpicWithTasks[]
    x: number
    y: number
    dateLabel: string
  } | null>(null)

  const { data: epics = [], isLoading } = useBoardQuery()
  const { mutate: updateEpic } = useEpicUpdate()

  // 이전 달로 이동
  const handlePrevMonth = useCallback(() => {
    if (month === 0) {
      setYear((y) => y - 1)
      setMonth(11)
    } else {
      setMonth((m) => m - 1)
    }
  }, [month])

  // 다음 달로 이동
  const handleNextMonth = useCallback(() => {
    if (month === 11) {
      setYear((y) => y + 1)
      setMonth(0)
    } else {
      setMonth((m) => m + 1)
    }
  }, [month])

  // 에픽 색상 변경 API 호출
  const handleColorChange = useCallback(
    (epic: EpicWithTasks, color: string | null) => {
      updateEpic({
        id: epic.id,
        title: epic.title,
        description: epic.description ?? undefined,
        status: epic.status,
        startDate: epic.startDate,
        dueDate: epic.dueDate,
        color,
      })
    },
    [updateEpic],
  )

  // 에픽 바 클릭 → 더보기 팝오버 닫고 색상 팝오버 열기
  const handleEpicBarClick = useCallback((epic: EpicWithTasks, x: number, y: number) => {
    setMorePopover(null)
    setColorPopover({ epic, x, y })
  }, [])

  // 더보기 버튼 클릭 → 해당 날의 전체 에픽 팝오버 열기
  const handleMoreClick = useCallback(
    (dayEpics: EpicWithTasks[], day: Date, x: number, y: number) => {
      const dateLabel = `${day.getFullYear()}${COMMON_MSG.DATE_YEAR_SUFFIX} ${day.getMonth() + 1}${COMMON_MSG.DATE_MONTH_SUFFIX} ${day.getDate()}${COMMON_MSG.DATE_DAY_SUFFIX}`
      setMorePopover({ epics: dayEpics, x, y, dateLabel })
    },
    [],
  )

  const weeks = getCalendarWeeks(year, month)

  return (
    <div className={s.container}>
      <div className={s.content}>
        {/* 헤더: 타이틀 + 월 내비게이션 */}
        <div className={s.header}>
          <h1 className={s.title}>{CALENDAR_MSG.PAGE_TITLE}</h1>
          <div className={s.navBar}>
            <button
              type='button'
              className={s.navBtn}
              onClick={handlePrevMonth}
              aria-label={CALENDAR_MSG.PREV_MONTH}
            >
              <ChevronLeft size={16} />
            </button>
            <span className={s.monthLabel}>
              {year}{COMMON_MSG.DATE_YEAR_SUFFIX} {String(month + 1).padStart(2, '0')}{COMMON_MSG.DATE_MONTH_SUFFIX}
            </span>
            <button
              type='button'
              className={s.navBtn}
              onClick={handleNextMonth}
              aria-label={CALENDAR_MSG.NEXT_MONTH}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 캘린더 본문 */}
        <div className={s.calendarWrapper}>
          <div className={s.calendarGrid}>
            {/* 요일 헤더 */}
            <div className={s.dayHeaderRow}>
              {CALENDAR_MSG.DAY_HEADERS.map((d, i) => (
                <div
                  key={i}
                  className={s.dayHeaderCell({
                    day: i === 0 ? 'sun' : i === 6 ? 'sat' : 'weekday',
                  })}
                >
                  {d}
                </div>
              ))}
            </div>

            {isLoading ? (
              /* 로딩 스켈레톤 */
              <div className='animate-pulse'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className='border-b border-secondary-700 last:border-b-0'
                    style={{ height: CELL_HEIGHT }}
                  >
                    <div className='grid grid-cols-7 h-full'>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <div key={j} className='border-r border-secondary-700/50 last:border-r-0 p-2'>
                          <div className='w-5 h-5 rounded-full bg-secondary-700 mb-2' />
                          <div className='h-4 rounded bg-secondary-700/50 mb-1' />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {weeks.map((weekDays, wi) => {
                const placements = assignLanesForWeek(epics, weekDays)
                const overflowByDay = getOverflowByDay(placements)
                // MAX_VISIBLE_EPICS 미만 슬롯만 렌더링
                const visiblePlacements = placements.filter((p) => p.lane < MAX_VISIBLE_EPICS)

                return (
                  <div key={wi} className={s.weekRow} style={{ height: CELL_HEIGHT }}>
                    {/* 날짜 셀 경계선 배경 (절대 위치) */}
                    <div className='absolute inset-0 grid grid-cols-7 pointer-events-none'>
                      {weekDays.map((_, di) => (
                        <div
                          key={di}
                          className='border-r border-b border-secondary-700 last:border-r-0'
                        />
                      ))}
                    </div>

                    {/* 날짜 숫자 (절대 위치, 각 열 상단 왼쪽 정렬) */}
                    {weekDays.map((day, di) => (
                      <div
                        key={di}
                        className='absolute top-1.5 flex justify-start pl-2 pointer-events-none'
                        style={{ left: `${(di / 7) * 100}%`, width: `${(1 / 7) * 100}%` }}
                      >
                        <span className={getDayNumClass(day, month, todayStr)}>
                          {day.getDate()}
                        </span>
                      </div>
                    ))}

                    {/* 날짜 숫자 영역 하단 구분선 */}
                    <div
                      className='absolute left-0 right-0 border-b border-secondary-700/40 pointer-events-none'
                      style={{ top: DAY_NUM_AREA }}
                    />

                    {/* 에픽 바 (절대 위치) */}
                    {visiblePlacements.map((p, pi) => {
                      const barTop = DAY_NUM_AREA + p.lane * (BAR_HEIGHT + BAR_GAP)
                      const leftPct = (p.startCol / 7) * 100
                      const widthPct = ((p.endCol - p.startCol + 1) / 7) * 100
                      // 주 경계 이어짐 여부에 따라 모서리 처리
                      const borderRadius = [
                        p.continuesLeft ? '0' : '4px',
                        p.continuesRight ? '0' : '4px',
                        p.continuesRight ? '0' : '4px',
                        p.continuesLeft ? '0' : '4px',
                      ].join(' ')

                      return (
                        <Tooltip key={pi} content={formatBarTooltip(p.epic.startDate, p.epic.dueDate)}>
                          <div
                            className='absolute flex items-center overflow-hidden cursor-pointer select-none z-[2] hover:opacity-80 transition-opacity duration-150'
                            style={{
                              top: barTop,
                              left: `calc(${leftPct}% + 2px)`,
                              width: `calc(${widthPct}% - 4px)`,
                              height: BAR_HEIGHT,
                              borderRadius,
                              backgroundColor: getEpicColor(p.epic),
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEpicBarClick(p.epic, e.clientX, e.clientY)
                            }}
                          >
                            <span className='text-xs text-white px-1.5 truncate'>{p.epic.title}</span>
                          </div>
                        </Tooltip>
                      )
                    })}

                    {/* 더보기 버튼 (일별, 오버플로우 있을 때만) */}
                    {weekDays.map((day, di) => {
                      const count = overflowByDay[di]
                      if (count === 0) return null

                      return (
                        <button
                          key={di}
                          type='button'
                          className={`absolute z-[3] ${s.moreBtn}`}
                          style={{
                            bottom: 4,
                            left: `${(di / 7) * 100}%`,
                            width: `${(1 / 7) * 100}%`,
                          }}
                          onClick={(e) => {
                            const dayEpics = getEpicsForDay(placements, di)
                            handleMoreClick(dayEpics, day, e.clientX, e.clientY)
                          }}
                        >
                          +{count} {CALENDAR_MSG.MORE}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )}

          {/* 에픽 없는 경우 (로딩 완료 후) */}
          {!isLoading && epics.length === 0 && (
            <div className={s.emptyState}>{CALENDAR_MSG.EMPTY_EPICS}</div>
          )}
          </div>
        </div>
      </div>

      {/* 색상 변경 팝오버 */}
      {colorPopover && (
        <ColorPopover
          x={colorPopover.x}
          y={colorPopover.y}
          epic={colorPopover.epic}
          onClose={() => setColorPopover(null)}
          onChange={handleColorChange}
        />
      )}

      {/* 더보기 팝오버 */}
      {morePopover && (
        <MorePopover
          x={morePopover.x}
          y={morePopover.y}
          dateLabel={morePopover.dateLabel}
          epics={morePopover.epics}
          onClose={() => setMorePopover(null)}
          onEpicClick={handleEpicBarClick}
        />
      )}
    </div>
  )
}
