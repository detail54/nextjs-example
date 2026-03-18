import type { ReactNode } from 'react'

// 공통 모달 기반 props
export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  /** ESC 키로 닫기 (기본값 true) */
  closeOnEsc?: boolean
  /** 백드롭 클릭으로 닫기 (기본값 true) */
  closeOnBackdrop?: boolean
}

// 모달 종류
export type ModalType = 'confirm' | 'alert'

// 전역 ConfirmModal 설정 (store에서 사용)
export type ConfirmModalConfig = Pick<ModalProps, 'closeOnEsc' | 'closeOnBackdrop'> & {
  type: ModalType
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'primary' | 'danger'
  onConfirm?: () => void
  onClose?: () => void
}

// 전역 BasicModal 설정 (store에서 사용)
export type BasicModalConfig = Pick<ModalProps, 'closeOnEsc' | 'closeOnBackdrop'> & {
  title: string
  /** 바디 콘텐츠 */
  children: ReactNode
  /** CSS max-width 값 */
  maxWidth?: string
  /** 닫기 콜백 */
  onClose?: () => void
}

