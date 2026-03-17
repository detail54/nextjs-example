import { create } from 'zustand'
import type { ModalConfig } from '@/components/modal/type'

// 전역 모달 상태 타입
type ModalStore = {
  /** 현재 표시할 모달 설정 (null이면 닫힘) */
  modal: ModalConfig | null
  /** 모달 열기 */
  openModal: (config: ModalConfig) => void
  /** 모달 닫기 */
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  openModal: (config) => set({ modal: config }),
  closeModal: () => set({ modal: null }),
}))
