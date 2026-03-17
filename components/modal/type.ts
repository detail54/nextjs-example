// 모달 종류
export type ModalType = 'confirm' | 'alert'

// 전역 모달 설정 (store에서 사용)
export type ModalConfig = {
  type: ModalType
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'primary' | 'danger'
  onConfirm?: () => void
  onClose?: () => void
}

// 기본 모달 props
export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

// 확인/취소 모달 props
export type ConfirmModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  /** 확인 버튼 색상 변형 */
  variant?: 'primary' | 'danger'
  /** 확인 버튼 로딩 상태 */
  isLoading?: boolean
  /** alert 타입 - 취소 버튼 숨김 */
  hideCancel?: boolean
}
