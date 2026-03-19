import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { BoardTask, EpicWithTasks } from '@/features/board/api/type'

// 패널 타입 정의 (none | 에픽 등록 | 에픽 수정 | 태스크 상세)
type PanelState =
  | { type: 'none' }
  | { type: 'epicCreate' }
  | { type: 'epicEdit'; epic: EpicWithTasks }
  | { type: 'taskDetail'; task: BoardTask }

type TimelinePanelStore = {
  // 현재 열린 패널 상태
  panel: PanelState
  openEpicCreate: () => void
  openEpicEdit: (epic: EpicWithTasks) => void
  openTaskDetail: (task: BoardTask) => void
  closePanel: () => void
}

export const useTimelinePanelStore = create<TimelinePanelStore>()(
  devtools(
    (set) => ({
      panel: { type: 'none' },
      openEpicCreate: () => set({ panel: { type: 'epicCreate' } }, false, 'openEpicCreate'),
      openEpicEdit: (epic) => set({ panel: { type: 'epicEdit', epic } }, false, 'openEpicEdit'),
      openTaskDetail: (task) =>
        set({ panel: { type: 'taskDetail', task } }, false, 'openTaskDetail'),
      closePanel: () => set({ panel: { type: 'none' } }, false, 'closePanel'),
    }),
    { name: 'TimelinePanelStore' },
  ),
)
