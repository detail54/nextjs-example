import { create } from 'zustand'
import type { BoardTask } from '@/features/board/api/type'

// 보드 우측 패널 상태
type BoardPanelStore = {
  // 상세보기 중인 태스크 (null이면 패널 닫힘)
  selectedTask: BoardTask | null
  setSelectedTask: (task: BoardTask | null) => void
}

export const useBoardPanelStore = create<BoardPanelStore>((set) => ({
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
}))
