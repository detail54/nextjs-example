'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { backdropStyle } from './Modal.styles'
import type { ModalProps } from './type'

// 공통 모달 기반 - portal, 스크롤 잠금, ESC/백드롭 클릭 닫기 처리
export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnEsc = true,
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    // 모달 열림 시 body 스크롤 잠금
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC 키로 닫기 (closeOnEsc가 true일 때만)
      if (closeOnEsc && e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, closeOnEsc])

  // SSR 환경 또는 닫힌 상태에서는 렌더링 안 함
  if (!isOpen || typeof document === 'undefined') return null

  return createPortal(
    <div className={backdropStyle()} onClick={closeOnBackdrop ? onClose : undefined}>
      {children}
    </div>,
    document.body,
  )
}
