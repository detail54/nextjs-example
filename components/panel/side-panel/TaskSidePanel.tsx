'use client'

import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useTaskPanelStore, MIN_TASK_PANEL_WIDTH, MAX_TASK_PANEL_WIDTH } from '@/stores/useTaskPanelStore'
import BoardTaskDetail from '@/features/board/components/BoardTaskDetail'
import SidePanel from './SidePanel'

// 태스크 상세보기 전용 사이드 패널
export default function TaskSidePanel() {
  const { task, panelWidth, setPanelWidth, closePanel } = useTaskPanelStore()

  const isOpen = task !== null

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={closePanel}
      title={BOARD_MSG.TASK_PANEL_TITLE}
      panelWidth={panelWidth}
      onWidthChange={setPanelWidth}
      minWidth={MIN_TASK_PANEL_WIDTH}
      maxWidth={MAX_TASK_PANEL_WIDTH}
    >
      {task && <BoardTaskDetail task={task} />}
    </SidePanel>
  )
}
