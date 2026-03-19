import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { EpicWithTasks } from '@/features/common/api/type'

// 패널 기본/최소/최대 너비
export const DEFAULT_EPIC_PANEL_WIDTH = 480
export const MIN_EPIC_PANEL_WIDTH = 320
export const MAX_EPIC_PANEL_WIDTH = 800

// 에픽 패널 타입 (null이면 닫힘)
export type EpicPanelConfig =
  | { type: 'epicCreate' }
  | { type: 'epicEdit'; epic: EpicWithTasks }

type EpicPanelStore = {
  // 현재 열린 패널 설정 (null이면 닫힘)
  panel: EpicPanelConfig | null
  // 현재 패널 너비
  panelWidth: number
  openEpicCreate: () => void
  openEpicEdit: (epic: EpicWithTasks) => void
  setPanelWidth: (width: number) => void
  closePanel: () => void
}

export const useEpicPanelStore = create<EpicPanelStore>()(
  devtools(
    (set) => ({
      panel: null,
      panelWidth: DEFAULT_EPIC_PANEL_WIDTH,
      openEpicCreate: () => set({ panel: { type: 'epicCreate' } }, false, 'openEpicCreate'),
      openEpicEdit: (epic) => set({ panel: { type: 'epicEdit', epic } }, false, 'openEpicEdit'),
      setPanelWidth: (width) => set({ panelWidth: width }, false, 'setPanelWidth'),
      closePanel: () => set({ panel: null }, false, 'closePanel'),
    }),
    { name: 'EpicPanelStore' },
  ),
)
