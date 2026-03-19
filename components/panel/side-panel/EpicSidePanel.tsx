'use client'

import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useEpicPanelStore, MIN_EPIC_PANEL_WIDTH, MAX_EPIC_PANEL_WIDTH } from '@/stores/useEpicPanelStore'
import BoardEpicForm from '@/features/board/components/BoardEpicForm'
import SidePanel from './SidePanel'

// 에픽 등록/수정 전용 사이드 패널
export default function EpicSidePanel() {
  const { panel, panelWidth, setPanelWidth, closePanel } = useEpicPanelStore()

  const isOpen = panel !== null

  // 에픽 패널 타이틀
  const title =
    panel?.type === 'epicCreate' ? BOARD_MSG.EPIC_REGISTER_TITLE : BOARD_MSG.EPIC_EDIT_TITLE

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={closePanel}
      title={title}
      panelWidth={panelWidth}
      onWidthChange={setPanelWidth}
      minWidth={MIN_EPIC_PANEL_WIDTH}
      maxWidth={MAX_EPIC_PANEL_WIDTH}
    >
      {panel?.type === 'epicCreate' ? (
        <BoardEpicForm onSuccess={closePanel} />
      ) : panel?.type === 'epicEdit' ? (
        <BoardEpicForm epic={panel.epic} onSuccess={closePanel} />
      ) : null}
    </SidePanel>
  )
}
