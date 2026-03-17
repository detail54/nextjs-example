'use client'

import { useModalStore } from '@/stores/useModalStore'
import { COMMON_MSG } from '@/context/commonMsg'
import ConfirmModal from './ConfirmModal'

// 루트 레이아웃에 마운트되는 전역 모달 렌더러
export default function ModalProvider() {
  const { modal, closeModal } = useModalStore()

  // 모달 닫기 - 스토어 초기화 + 사용자 onClose 콜백 실행
  const handleClose = () => {
    modal?.onClose?.()
    closeModal()
  }

  // 확인 - 사용자 onConfirm 콜백 실행 후 닫기
  const handleConfirm = () => {
    modal?.onConfirm?.()
    closeModal()
  }

  return (
    <ConfirmModal
      isOpen={modal !== null}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={modal?.title ?? ''}
      description={modal?.description}
      confirmLabel={modal?.confirmLabel ?? COMMON_MSG.CONFIRM}
      cancelLabel={modal?.cancelLabel ?? COMMON_MSG.CANCEL}
      variant={modal?.variant ?? 'primary'}
      hideCancel={modal?.type === 'alert'}
    />
  )
}
