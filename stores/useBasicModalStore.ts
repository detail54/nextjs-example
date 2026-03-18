import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { BasicModalConfig } from '@/components/modal/type'

// 전역 BasicModal 상태 타입
type BasicModalStore = {
  /** 현재 표시할 모달 설정 (null이면 닫힘) */
  modal: BasicModalConfig | null
  /** 모달 열기 */
  openBasicModal: (config: BasicModalConfig) => void
  /** 모달 닫기 */
  closeBasicModal: () => void
}

export const useBasicModalStore = create<BasicModalStore>()(
  devtools(
    (set) => ({
      modal: null,
      openBasicModal: (config) => set({ modal: config }, false, 'openBasicModal'),
      closeBasicModal: () => set({ modal: null }, false, 'closeBasicModal'),
    }),
    { name: 'BasicModalStore' },
  ),
)
