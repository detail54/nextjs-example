'use client'

import { useCallback } from 'react'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import Modal from './Modal'
import BasicButton from '@/components/button/BasicButton'
import {
  confirmContainerStyle,
  confirmModalInnerStyle,
  confirmTitleStyle,
  confirmDescStyle,
  confirmActionsStyle,
} from './ConfirmModal.styles'
import { COMMON_MSG } from '@/context/messages/commonMsg'

// 확인/취소 공통 모달 - useConfirmModalStore로 제어
export default function ConfirmModal() {
  const { modal, closeConfirmModal } = useConfirmModalStore()

  // 닫기 - 스토어 초기화 + 사용자 onClose 콜백 실행
  const handleClose = useCallback(() => {
    modal?.onClose?.()
    closeConfirmModal()
  }, [modal, closeConfirmModal])

  // 확인 - 사용자 onConfirm 콜백 실행 후 닫기
  const handleConfirm = useCallback(() => {
    modal?.onConfirm?.()
    closeConfirmModal()
  }, [modal, closeConfirmModal])

  return (
    <Modal
      isOpen={modal !== null}
      onClose={handleClose}
      closeOnEsc={modal?.closeOnEsc}
      closeOnBackdrop={modal?.closeOnBackdrop}
    >
      <div className={confirmContainerStyle()} onClick={(e) => e.stopPropagation()}>
        <div className={confirmModalInnerStyle()}>
          {/* 제목 + 설명 */}
          <div className='flex flex-col gap-1.5'>
            <p className={confirmTitleStyle()}>{modal?.title ?? ''}</p>
            {modal?.description && <p className={confirmDescStyle()}>{modal.description}</p>}
          </div>

          {/* 버튼 영역 */}
          <div className={confirmActionsStyle()}>
            {modal?.type !== 'alert' && (
              <BasicButton variant='outline-dark' size='sm' onClick={handleClose}>
                {modal?.cancelLabel ?? COMMON_MSG.CANCEL}
              </BasicButton>
            )}
            <BasicButton
              variant={modal?.variant ?? 'primary'}
              size='sm'
              onClick={handleConfirm}
            >
              {modal?.confirmLabel ?? COMMON_MSG.CONFIRM}
            </BasicButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
