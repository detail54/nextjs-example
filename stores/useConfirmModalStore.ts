import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ConfirmModalConfig } from '@/components/modal/type'

// 전역 ConfirmModal 상태 타입
type ConfirmModalStore = {
  /** 현재 표시할 모달 설정 (null이면 닫힘) */
  modal: ConfirmModalConfig | null
  /** 모달 열기 */
  openConfirmModal: (config: ConfirmModalConfig) => void
  /** 모달 닫기 */
  closeConfirmModal: () => void
}

export const useConfirmModalStore = create<ConfirmModalStore>()(
  devtools(
    (set) => ({
      modal: null,
      openConfirmModal: (config) => set({ modal: config }, false, 'openConfirmModal'),
      closeConfirmModal: () => set({ modal: null }, false, 'closeConfirmModal'),
    }),
    { name: 'ConfirmModalStore' },
  ),
)
