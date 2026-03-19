import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { BoardTask } from '@/features/common/api/type'

// 패널 기본/최소/최대 너비
export const DEFAULT_TASK_PANEL_WIDTH = 480
export const MIN_TASK_PANEL_WIDTH = 320
export const MAX_TASK_PANEL_WIDTH = 800

type TaskPanelStore = {
  // 상세보기 중인 태스크 (null이면 닫힘)
  task: BoardTask | null
  // 현재 패널 너비
  panelWidth: number
  openTaskDetail: (task: BoardTask) => void
  setPanelWidth: (width: number) => void
  closePanel: () => void
}

export const useTaskPanelStore = create<TaskPanelStore>()(
  devtools(
    (set) => ({
      task: null,
      panelWidth: DEFAULT_TASK_PANEL_WIDTH,
      openTaskDetail: (task) => set({ task }, false, 'openTaskDetail'),
      setPanelWidth: (width) => set({ panelWidth: width }, false, 'setPanelWidth'),
      closePanel: () => set({ task: null }, false, 'closePanel'),
    }),
    { name: 'TaskPanelStore' },
  ),
)
