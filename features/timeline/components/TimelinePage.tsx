'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useBoardQuery } from '@/features/board/hooks/useBoardQuery'
import { useTimelinePanelStore } from '@/stores/useTimelinePanelStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import BoardEpicForm from '@/features/board/components/BoardEpicForm'
import TimelineEpicRow from './TimelineEpicRow'
import TimelineTaskCreateForm from './TimelineTaskCreateForm'
import SidePanel from '@/components/side-panel/SidePanel'
import { MONTH_WIDTH, MONTHS_BEFORE, TOTAL_MONTHS, LEFT_WIDTH, getMonthList } from '../utils/timelineUtils'
import { timelinePageStyles } from './TimelinePage.styles'

// 패널 기본/최소/최대 너비
const DEFAULT_PANEL_WIDTH = 480
const MIN_PANEL_WIDTH = 320
const MAX_PANEL_WIDTH = 800

// 타임라인 월 목록 (컴포넌트 외부에서 1번 계산)
const MONTHS = getMonthList()
const TOTAL_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

// 타임라인 메인 페이지
export default function TimelinePage() {
  const { data: epics = [], isLoading } = useBoardQuery()
  const { isAdmin } = useAuth()

  // 타임라인 스크롤 컨테이너 ref
  const scrollRef = useRef<HTMLDivElement>(null)

  // 초기 스크롤: 현재 월이 2번째 컬럼에 위치하도록 (현재 월 직전 1개월부터 보이게)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = (MONTHS_BEFORE - 1) * MONTH_WIDTH
    }
  }, [])

  // 패널 현재 너비
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)

  // 패널 상태 (none | epicCreate | epicEdit | taskCreate)
  const { panel, openEpicCreate, closePanel } = useTimelinePanelStore()

  // 패널 열림 여부 및 타이틀 결정
  const isPanelOpen = panel.type !== 'none'
  const panelTitle =
    panel.type === 'epicCreate'
      ? TIMELINE_MSG.EPIC_REGISTER_TITLE
      : panel.type === 'epicEdit'
        ? TIMELINE_MSG.EPIC_EDIT_TITLE
        : panel.type === 'taskCreate'
          ? TIMELINE_MSG.TASK_CREATE_TITLE
          : ''

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
          <div style={{ minWidth: LEFT_WIDTH + TOTAL_WIDTH }}>
            {/* 월 헤더 행 (sticky top) */}
            <div className={timelinePageStyles.headerRow}>
              {/* 왼쪽 코너 (sticky top + left) */}
              <div
                className={timelinePageStyles.headerCorner}
                style={{ width: LEFT_WIDTH, minWidth: LEFT_WIDTH, height: 44 }}
              >
                <span className={timelinePageStyles.headerCornerText}>
                  {TIMELINE_MSG.EPIC_LIST_HEADER}
                </span>
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
                    className='flex items-center gap-2 px-3 border-r border-secondary-700 bg-secondary-900 sticky left-0 z-10'
                    style={{ width: LEFT_WIDTH, minWidth: LEFT_WIDTH, height: 48 }}
                  >
                    <div className='w-4 h-4 rounded bg-secondary-700' />
                    <div className='h-3 bg-secondary-700 rounded flex-1' />
                  </div>
                  <div style={{ width: TOTAL_WIDTH, height: 48 }} className='bg-secondary-900/50' />
                </div>
              ))
            ) : epics.length === 0 ? (
              /* 빈 상태 */
              <div className={timelinePageStyles.emptyRow}>
                <div
                  className={timelinePageStyles.emptyLeft}
                  style={{ width: LEFT_WIDTH, minWidth: LEFT_WIDTH, height: 80 }}
                >
                  <span className={timelinePageStyles.emptyText}>{BOARD_MSG.EMPTY_EPICS}</span>
                </div>
                <div style={{ width: TOTAL_WIDTH }} />
              </div>
            ) : (
              /* 에픽 행 목록 */
              epics.map((epic) => <TimelineEpicRow key={epic.id} epic={epic} />)
            )}

            {/* 에픽 등록 버튼 행 (관리자만, 에픽 목록 마지막) */}
            {isAdmin && !isLoading && (
              <div className={timelinePageStyles.addEpicRow}>
                <div
                  className={timelinePageStyles.addEpicLeft}
                  style={{ width: LEFT_WIDTH, minWidth: LEFT_WIDTH }}
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

      {/* 우측 슬라이드 패널 (에픽 등록 / 에픽 수정 / 하위 작업 등록 공용) */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        title={panelTitle}
        panelWidth={panelWidth}
        onWidthChange={setPanelWidth}
        minWidth={MIN_PANEL_WIDTH}
        maxWidth={MAX_PANEL_WIDTH}
      >
        {panel.type === 'epicCreate' ? (
          <BoardEpicForm onSuccess={closePanel} />
        ) : panel.type === 'epicEdit' ? (
          <BoardEpicForm epic={panel.epic} onSuccess={closePanel} />
        ) : panel.type === 'taskCreate' ? (
          <TimelineTaskCreateForm epicId={panel.epicId} onSuccess={closePanel} />
        ) : null}
      </SidePanel>
    </div>
  )
}
