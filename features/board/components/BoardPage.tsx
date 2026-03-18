'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useBoardQuery } from '../hooks/useBoardQuery'
import { useBoardPanelStore } from '@/stores/useBoardPanelStore'
import BoardEpicAccordion from './BoardEpicAccordion'
import BoardEpicForm from './BoardEpicForm'
import BoardTaskDetail from './BoardTaskDetail'
import SidePanel from '@/components/side-panel/SidePanel'
import BasicButton from '@/components/button/BasicButton'
import { boardPageStyles } from './BoardPage.styles'

// 패널 기본/최소/최대 너비
const DEFAULT_PANEL_WIDTH = 480
const MIN_PANEL_WIDTH = 320
const MAX_PANEL_WIDTH = 800

// 보드 메인 페이지
export default function BoardPage() {
  const { data: epics = [] } = useBoardQuery()

  // 에픽 등록 패널 열림 상태
  const [isEpicFormOpen, setIsEpicFormOpen] = useState(false)
  // 패널 현재 너비
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH)

  // 선택된 태스크 (상세보기) / 수정 중인 에픽
  const { selectedTask, setSelectedTask, editingEpic, setEditingEpic } = useBoardPanelStore()

  // 패널 열림 여부 및 타이틀 결정
  const isPanelOpen = isEpicFormOpen || !!selectedTask || !!editingEpic
  const panelTitle = isEpicFormOpen
    ? BOARD_MSG.EPIC_REGISTER_TITLE
    : editingEpic
      ? BOARD_MSG.EPIC_EDIT_TITLE
      : BOARD_MSG.TASK_PANEL_TITLE

  const handleOpenEpicForm = () => {
    // 다른 패널 닫고 에픽 등록 열기
    setSelectedTask(null)
    setEditingEpic(null)
    setIsEpicFormOpen(true)
  }

  const handleClosePanel = () => {
    setIsEpicFormOpen(false)
    setSelectedTask(null)
    setEditingEpic(null)
  }

  return (
    <div className={boardPageStyles.container}>
      {/* 콘텐츠 영역 - 패널이 열리면 자연스럽게 밀림 */}
      <div className={boardPageStyles.content}>
        {/* 페이지 헤더 */}
        <div className={boardPageStyles.header}>
          <h1 className={boardPageStyles.title}>{BOARD_MSG.PAGE_TITLE}</h1>
          <BasicButton variant='primary' size='sm' onClick={handleOpenEpicForm}>
            <Plus className='mr-1.5 h-4 w-4' />
            {BOARD_MSG.EPIC_REGISTER}
          </BasicButton>
        </div>

        {/* 에픽 목록 */}
        {epics.length === 0 ? (
          <p className={boardPageStyles.empty}>{BOARD_MSG.EMPTY_EPICS}</p>
        ) : (
          <div className={boardPageStyles.epicList}>
            {epics.map((epic) => (
              <BoardEpicAccordion key={epic.id} epic={epic} />
            ))}
          </div>
        )}
      </div>

      {/* 우측 슬라이드 패널 (에픽 등록 / 에픽 수정 / 태스크 상세 공용) */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        title={panelTitle}
        panelWidth={panelWidth}
        onWidthChange={setPanelWidth}
        minWidth={MIN_PANEL_WIDTH}
        maxWidth={MAX_PANEL_WIDTH}
      >
        {isEpicFormOpen ? (
          <BoardEpicForm onSuccess={() => setIsEpicFormOpen(false)} />
        ) : editingEpic ? (
          <BoardEpicForm epic={editingEpic} onSuccess={handleClosePanel} />
        ) : selectedTask ? (
          <BoardTaskDetail task={selectedTask} />
        ) : null}
      </SidePanel>
    </div>
  )
}
