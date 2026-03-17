'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { NOTICE_MSG } from '@/context/noticeMsg'
import BasicButton from '@/components/button/BasicButton'
import {
  backdropStyle,
  modalContainerStyle,
  modalHeaderStyle,
  modalTitleStyle,
  closeButtonStyle,
  modalBodyStyle,
  contentTextStyle,
  modalFooterStyle,
} from './NoticeModal.styles'
import type { NoticeModalProps } from './type'

// 공지사항 상세 모달
export default function NoticeModal({ notice, onClose }: NoticeModalProps) {
  const isOpen = !!notice

  useEffect(() => {
    if (!isOpen) return

    // 모달 열림 시 body 스크롤 잠금
    document.body.style.overflow = 'hidden'

    // ESC 키로 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // SSR 환경 또는 닫힌 상태에서는 렌더링 안 함
  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div className={backdropStyle()} onClick={onClose}>
      {/* 클릭 이벤트 버블링 차단 */}
      <div className={modalContainerStyle()} onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className={modalHeaderStyle()}>
          <h2 className={modalTitleStyle()}>{notice.title}</h2>
          <button className={closeButtonStyle()} onClick={onClose} aria-label={NOTICE_MSG.MODAL_CLOSE}>
            <X size={16} />
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className={modalBodyStyle()}>
          <p className={contentTextStyle()}>{notice.content}</p>
        </div>

        {/* 푸터 */}
        <div className={modalFooterStyle()}>
          <BasicButton variant='outline-dark' size='sm' onClick={onClose}>
            {NOTICE_MSG.MODAL_CLOSE}
          </BasicButton>
        </div>
      </div>
    </div>,
    document.body,
  )
}
