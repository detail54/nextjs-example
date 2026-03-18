'use client'

import Modal from './Modal'
import BasicButton from '@/components/button/BasicButton'
import {
  confirmModalInnerStyle,
  confirmTitleStyle,
  confirmDescStyle,
  confirmActionsStyle,
} from './ConfirmModal.styles'
import { COMMON_MSG } from '@/context/messages/commonMsg'
import type { ConfirmModalProps } from './type'

// 확인/취소 공통 모달 컴포넌트
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = COMMON_MSG.CONFIRM,
  cancelLabel = COMMON_MSG.CANCEL,
  variant = 'primary',
  isLoading = false,
  hideCancel = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={confirmModalInnerStyle()}>
        {/* 제목 + 설명 */}
        <div className='flex flex-col gap-1.5'>
          <p className={confirmTitleStyle()}>{title}</p>
          {description && <p className={confirmDescStyle()}>{description}</p>}
        </div>

        {/* 버튼 영역 */}
        <div className={confirmActionsStyle()}>
          {!hideCancel && (
            <BasicButton variant='outline-dark' size='sm' onClick={onClose} disabled={isLoading}>
              {cancelLabel}
            </BasicButton>
          )}
          <BasicButton variant={variant} size='sm' onClick={onConfirm} disabled={isLoading}>
            {confirmLabel}
          </BasicButton>
        </div>
      </div>
    </Modal>
  )
}
