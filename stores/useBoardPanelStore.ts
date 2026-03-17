import { create } from 'zustand'
import type { BoardTask, EpicWithTasks } from '@/features/board/api/type'

// 보드 우측 패널 상태
type BoardPanelStore = {
  // 상세보기 중인 태스크 (null이면 닫힘)
  selectedTask: BoardTask | null
  setSelectedTask: (task: BoardTask | null) => void
  // 수정 중인 에픽 (null이면 닫힘)
  editingEpic: EpicWithTasks | null
  setEditingEpic: (epic: EpicWithTasks | null) => void
}

export const useBoardPanelStore = create<BoardPanelStore>((set) => ({
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task, editingEpic: null }),
  editingEpic: null,
  setEditingEpic: (epic) => set({ editingEpic: epic, selectedTask: null }),
}))
