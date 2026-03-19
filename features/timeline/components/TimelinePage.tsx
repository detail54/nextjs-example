'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { useBoardQuery } from '@/features/board/hooks/useBoardQuery'
import { useEpicPanelStore } from '@/stores/useEpicPanelStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import TimelineEpicRow from './TimelineEpicRow'
import {
  MONTH_WIDTH,
  MONTHS_BEFORE,
  TOTAL_MONTHS,
  LEFT_WIDTH,
  getMonthList,
} from '../utils/timelineUtils'
import { timelinePageStyles } from './TimelinePage.styles'

// 타임라인 월 목록 (컴포넌트 외부에서 1번 계산)
const MONTHS = getMonthList()
const TOTAL_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

const MIN_LEFT_WIDTH = 160
const MAX_LEFT_WIDTH = 500

// 타임라인 메인 페이지
export default function TimelinePage() {
  const { data: epics = [], isLoading } = useBoardQuery()
  const { isAdmin } = useAuth()
  const { openEpicCreate } = useEpicPanelStore()

  // 타임라인 스크롤 컨테이너 ref
  const scrollRef = useRef<HTMLDivElement>(null)

  // 왼쪽 너비 CSS 변수를 적용할 컨테이너 ref (리렌더 없이 DOM 직접 조작)
  const containerRef = useRef<HTMLDivElement>(null)
  // 현재 너비를 추적하는 ref (state 대신 사용)
  const leftWidthRef = useRef(LEFT_WIDTH)

  // 구분선 드래그 시작 - CSS 변수만 업데이트하여 리렌더 없이 너비 변경
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = leftWidthRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const next = Math.min(
        MAX_LEFT_WIDTH,
        Math.max(MIN_LEFT_WIDTH, startWidth + e.clientX - startX),
      )
      leftWidthRef.current = next
      containerRef.current?.style.setProperty('--left-width', `${next}px`)
    }
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  // 초기 스크롤: 현재 월이 2번째 컬럼에 위치하도록 (현재 월 직전 1개월부터 보이게)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = (MONTHS_BEFORE - 1) * MONTH_WIDTH
    }
  }, [])

  return (
    <div className={timelinePageStyles.container}>
      {/* 콘텐츠 영역 */}
      <div className={timelinePageStyles.content}>
        {/* 페이지 헤더 */}
        <div className={timelinePageStyles.header}>
          <h1 className={timelinePageStyles.title}>{TIMELINE_MSG.PAGE_TITLE}</h1>
        </div>

        {/* 타임라인 스크롤 영역 */}
        <div ref={scrollRef} className={timelinePageStyles.scrollArea}>
          {/* CSS 변수 --left-width로 모든 하위 행의 왼쪽 열 너비 제어 */}
          <div
            ref={containerRef}
            style={
              {
                '--left-width': `${LEFT_WIDTH}px`,
                minWidth: `calc(var(--left-width) + ${TOTAL_WIDTH}px)`,
              } as React.CSSProperties
            }
          >
            {/* 월 헤더 행 (sticky top) */}
            <div className={timelinePageStyles.headerRow}>
              {/* 왼쪽 코너 (sticky top + left) */}
              <div
                className={timelinePageStyles.headerCorner}
                style={
                  {
                    width: 'var(--left-width)',
                    minWidth: 'var(--left-width)',
                    height: 44,
                  } as React.CSSProperties
                }
              >
                <span className={timelinePageStyles.headerCornerText}>
                  {TIMELINE_MSG.EPIC_LIST_HEADER}
                </span>
                {/* 구분선 드래그 핸들 */}
                <div className={timelinePageStyles.resizeHandle} onMouseDown={handleResizeStart} />
              </div>

              {/* 월 헤더 셀 - i>0에만 border-l 적용해 monthLine(left: i*MONTH_WIDTH)과 1px 정렬 */}
              {MONTHS.map((m, i) => (
                <div
                  key={i}
                  className={`${timelinePageStyles.monthCell({ current: m.isCurrent })}${i > 0 ? ' border-l border-secondary-600' : ''}`}
                  style={{ width: MONTH_WIDTH, minWidth: MONTH_WIDTH }}
                >
                  {m.label}
                </div>
              ))}
            </div>

            {/* 에픽 목록 */}
            {isLoading ? (
              /* 로딩 스켈레톤 */
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className='flex border-b border-secondary-700/50 animate-pulse'>
                  <div
                    className='flex items-center gap-2 px-3 border-r-2 border-secondary-600 bg-secondary-900 sticky left-0 z-10'
                    style={
                      {
                        width: 'var(--left-width)',
                        minWidth: 'var(--left-width)',
                        height: 48,
                      } as React.CSSProperties
                    }
                  >
                    <div className='w-4 h-4 rounded bg-secondary-700' />
                    <div className='h-3 bg-secondary-700 rounded flex-1' />
                    <div
                      className='absolute right-0 top-0 bottom-0 w-3 cursor-col-resize translate-x-1/2 z-10'
                      onMouseDown={handleResizeStart}
                    />
                  </div>
                  <div style={{ width: TOTAL_WIDTH, height: 48 }} className='bg-secondary-900/50' />
                </div>
              ))
            ) : epics.length === 0 ? (
              /* 빈 상태 */
              <div className={timelinePageStyles.emptyRow}>
                <div
                  className={timelinePageStyles.emptyLeft}
                  style={
                    {
                      width: 'var(--left-width)',
                      minWidth: 'var(--left-width)',
                      height: 80,
                    } as React.CSSProperties
                  }
                >
                  <span className={timelinePageStyles.emptyText}>{TIMELINE_MSG.EMPTY_EPICS}</span>
                </div>
                <div style={{ width: TOTAL_WIDTH }} />
              </div>
            ) : (
              /* 에픽 행 목록 */
              epics.map((epic) => (
                <TimelineEpicRow key={epic.id} epic={epic} onResizeStart={handleResizeStart} />
              ))
            )}

            {/* 에픽 등록 버튼 행 (관리자만, 에픽 목록 마지막) */}
            {isAdmin && !isLoading && (
              <div className={timelinePageStyles.addEpicRow}>
                <div
                  className={timelinePageStyles.addEpicLeft}
                  style={
                    {
                      width: 'var(--left-width)',
                      minWidth: 'var(--left-width)',
                    } as React.CSSProperties
                  }
                >
                  <button
                    type='button'
                    className={timelinePageStyles.addEpicBtn}
                    onClick={openEpicCreate}
                  >
                    <Plus size={14} />
                    {TIMELINE_MSG.EPIC_REGISTER}
                  </button>
                </div>
                <div style={{ width: TOTAL_WIDTH }} className={timelinePageStyles.addEpicRight} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
