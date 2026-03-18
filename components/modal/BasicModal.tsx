'use client'

import { useCallback } from 'react'
import { X } from 'lucide-react'
import { useBasicModalStore } from '@/stores/useBasicModalStore'
import Modal from './Modal'
import BasicButton from '@/components/button/BasicButton'
import {
  basicModalContainerStyle,
  basicModalHeaderStyle,
  basicModalTitleStyle,
  basicModalCloseButtonStyle,
  basicModalBodyStyle,
  basicModalFooterStyle,
} from './BasicModal.styles'
import { COMMON_MSG } from '@/context/messages/commonMsg'

// 타이틀 + 바디 + 푸터 구조의 공통 모달 - useBasicModalStore로 제어
export default function BasicModal() {
  const { modal, closeBasicModal } = useBasicModalStore()

  // 닫기 - 스토어 초기화 + 사용자 onClose 콜백 실행
  const handleClose = useCallback(() => {
    modal?.onClose?.()
    closeBasicModal()
  }, [modal, closeBasicModal])

  return (
    <Modal
      isOpen={modal !== null}
      onClose={handleClose}
      closeOnEsc={modal?.closeOnEsc}
      closeOnBackdrop={modal?.closeOnBackdrop}
    >
      <div
        className={basicModalContainerStyle()}
        style={{ maxWidth: modal?.maxWidth ?? '42rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className={basicModalHeaderStyle()}>
          <h2 className={basicModalTitleStyle()}>{modal?.title ?? ''}</h2>
          <button
            className={basicModalCloseButtonStyle()}
            onClick={handleClose}
            aria-label={COMMON_MSG.CLOSE}
          >
            <X size={16} />
          </button>
        </div>

        {/* 바디 */}
        <div className={basicModalBodyStyle()}>{modal?.children}</div>

        {/* 푸터 */}
        <div className={basicModalFooterStyle()}>
          <BasicButton variant='outline-dark' size='sm' onClick={handleClose}>
            {COMMON_MSG.CLOSE}
          </BasicButton>
        </div>
      </div>
    </Modal>
  )
}
