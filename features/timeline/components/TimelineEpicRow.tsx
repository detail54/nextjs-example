'use client'

import { useState } from 'react'
import { CheckSquare, ChevronRight, Layers, MoreHorizontal } from 'lucide-react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { useTimelinePanelStore } from '@/stores/useTimelinePanelStore'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useEpicDelete } from '@/features/board/hooks/useEpic'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { EpicWithTasks } from '@/features/board/api/type'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import Icon from '@/components/icon/Icon'
import {
  MONTH_WIDTH,
  TOTAL_MONTHS,
  EPIC_ROW_HEIGHT,
  TASK_ROW_HEIGHT,
  calcBarPosition,
  getTodayX,
  getMonthList,
} from '../utils/timelineUtils'
import { timelineEpicRowStyles } from './TimelineEpicRow.styles'

// 타임라인 월 목록 (렌더링 시 1번만 계산)
const MONTHS = getMonthList()
const TODAY_X = getTodayX()
const TOTAL_WIDTH = TOTAL_MONTHS * MONTH_WIDTH

interface TimelineEpicRowProps {
  epic: EpicWithTasks
}

// 에픽 행 + 하위 태스크 행 컴포넌트
export default function TimelineEpicRow({ epic }: TimelineEpicRowProps) {
  // 태스크 펼침 여부
  const [isOpen, setIsOpen] = useState(false)

  const { isAdmin } = useAuth()
  const { openEpicEdit, openTaskCreate, openTaskDetail } = useTimelinePanelStore()
  const { openConfirmModal } = useConfirmModalStore()
  const { mutate: deleteEpic } = useEpicDelete()

  const handleEdit = () => openEpicEdit(epic)

  const handleDeleteClick = () => {
    openConfirmModal({
      type: 'confirm',
      title: TIMELINE_MSG.EPIC_DELETE_CONFIRM_TITLE,
      description: TIMELINE_MSG.EPIC_DELETE_CONFIRM_DESC,
      confirmLabel: TIMELINE_MSG.EPIC_DELETE_CONFIRM,
      variant: 'danger',
      onConfirm: () => deleteEpic(epic.id),
    })
  }

  const handleTaskCreate = () => openTaskCreate(epic.id)

  // 관리자 전용 드롭다운 메뉴 항목
  const dropdownItems = [
    { label: TIMELINE_MSG.EPIC_EDIT, onClick: handleEdit },
    { label: TIMELINE_MSG.TASK_CREATE, onClick: handleTaskCreate },
    { label: TIMELINE_MSG.EPIC_DELETE, onClick: handleDeleteClick, danger: true },
  ]

  // 에픽 바 위치 계산
  const epicBar = calcBarPosition(epic.startDate, epic.dueDate)

  return (
    <>
      {/* 에픽 행 */}
      <div className={timelineEpicRowStyles.epicRow()} style={{ height: EPIC_ROW_HEIGHT }}>
        {/* 왼쪽: 에픽 정보 (sticky) */}
        <div
          className={timelineEpicRowStyles.epicLeft}
          style={{ width: 280, minWidth: 280 }}
        >
          {/* 하위 태스크 토글 버튼 */}
          <button
            type='button'
            className={timelineEpicRowStyles.toggleBtn}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
          >
            <ChevronRight
              size={14}
              style={{
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.15s ease',
              }}
            />
          </button>

          {/* 에픽 아이콘 + 제목 */}
          <Layers size={14} className='shrink-0 text-primary-400' />
          <span className={timelineEpicRowStyles.epicTitle}>{epic.title}</span>

          {/* ⋯ 드롭다운 (관리자만) */}
          {isAdmin && (
            <div className={timelineEpicRowStyles.moreWrapper}>
              <DropdownMenu
                trigger={<Icon icon={MoreHorizontal} size='sm' />}
                triggerClassName={timelineEpicRowStyles.moreBtn}
                items={dropdownItems}
              />
            </div>
          )}
        </div>

        {/* 오른쪽: 타임라인 바 영역 */}
        <div
          className={timelineEpicRowStyles.epicRight}
          style={{ width: TOTAL_WIDTH, height: EPIC_ROW_HEIGHT }}
        >
          {/* 월 구분선 및 현재 월 하이라이트 */}
          {MONTHS.map((m, i) => (
            <div key={i}>
              {/* 현재 월 배경 */}
              {m.isCurrent && (
                <div
                  className={timelineEpicRowStyles.currentMonthBg}
                  style={{ left: i * MONTH_WIDTH, width: MONTH_WIDTH }}
                />
              )}
              {/* 월 구분 세로선 (i=0은 왼쪽 컬럼 border-r과 겹치므로 skip) */}
              {i > 0 && (
                <div
                  className={timelineEpicRowStyles.monthLine}
                  style={{ left: i * MONTH_WIDTH }}
                />
              )}
            </div>
          ))}

          {/* 오늘 표시선 */}
          {TODAY_X >= 0 && TODAY_X <= TOTAL_WIDTH && (
            <div className={timelineEpicRowStyles.todayLine} style={{ left: TODAY_X }} />
          )}

          {/* 에픽 바 */}
          {epicBar && (
            <div
              className={timelineEpicRowStyles.epicBar({ status: epic.status })}
              style={{
                left: epicBar.left,
                width: epicBar.width,
                top: 10,
                height: EPIC_ROW_HEIGHT - 20,
              }}
            >
              <span className={timelineEpicRowStyles.epicBarText}>{epic.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* 하위 태스크 행 (펼쳐진 경우) */}
      {isOpen &&
        epic.tasks.map((task) => {
          const taskBar = calcBarPosition(task.startDate, task.dueDate)

          return (
            <div
              key={task.id}
              className={timelineEpicRowStyles.taskRow()}
              style={{ height: TASK_ROW_HEIGHT }}
            >
              {/* 왼쪽: 태스크 정보 (sticky, 들여쓰기) - 클릭 시 상세 패널 열기 */}
              <div
                className={`${timelineEpicRowStyles.taskLeft} cursor-pointer hover:bg-secondary-800/50`}
                style={{ width: 280, minWidth: 280 }}
                onClick={() => openTaskDetail(task)}
              >
                {/* 태스크 아이콘 + 제목 */}
                <CheckSquare size={12} className='shrink-0 text-secondary-400' />
                <span className={timelineEpicRowStyles.taskTitle}>{task.title}</span>
              </div>

              {/* 오른쪽: 태스크 타임라인 바 영역 */}
              <div
                className={timelineEpicRowStyles.taskRight}
                style={{ width: TOTAL_WIDTH, height: TASK_ROW_HEIGHT }}
              >
                {/* 월 구분선 */}
                {MONTHS.map((m, i) => (
                  <div key={i}>
                    {m.isCurrent && (
                      <div
                        className={timelineEpicRowStyles.currentMonthBg}
                        style={{ left: i * MONTH_WIDTH, width: MONTH_WIDTH }}
                      />
                    )}
                    {/* i=0은 왼쪽 컬럼 border-r과 겹치므로 skip */}
                    {i > 0 && (
                      <div
                        className={timelineEpicRowStyles.monthLine}
                        style={{ left: i * MONTH_WIDTH }}
                      />
                    )}
                  </div>
                ))}

                {/* 오늘 표시선 */}
                {TODAY_X >= 0 && TODAY_X <= TOTAL_WIDTH && (
                  <div className={timelineEpicRowStyles.todayLine} style={{ left: TODAY_X }} />
                )}

                {/* 태스크 바 */}
                {taskBar && (
                  <div
                    className={timelineEpicRowStyles.taskBar}
                    style={{
                      left: taskBar.left,
                      width: taskBar.width,
                      top: 8,
                      height: TASK_ROW_HEIGHT - 16,
                    }}
                  >
                    <span className={timelineEpicRowStyles.taskBarText}>{task.title}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
    </>
  )
}
