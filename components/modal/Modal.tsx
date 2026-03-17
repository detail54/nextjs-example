'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { backdropStyle, modalContainerStyle } from './Modal.styles'
import type { ModalProps } from './type'

// 기본 모달 컴포넌트 - portal로 document.body에 렌더링
export default function Modal({ isOpen, onClose, children }: ModalProps) {
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
      <div
        className={modalContainerStyle()}
        style={{ maxWidth: '420px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
