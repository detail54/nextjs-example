'use client'

import { useCallback, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { SIDE_PANEL_MSG } from '@/context/messages/sidePanelMsg'
import { sidePanelStyles } from './SidePanel.styles'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  // 현재 패널 너비
  panelWidth: number
  // 너비 변경 콜백 (리사이즈 완료 시 호출)
  onWidthChange: (width: number) => void
  minWidth?: number
  maxWidth?: number
}

// 우측 슬라이드 패널 공통 컴포넌트 (상세보기, 등록, 수정 등에 재사용)
export default function SidePanel({
  isOpen,
  onClose,
  title,
  children,
  panelWidth,
  onWidthChange,
  minWidth = 320,
  maxWidth = 800,
}: SidePanelProps) {
  // 외부 래퍼 ref - 너비 직접 조작용 (리사이즈 시 transition 없이 즉각 반응)
  const outerRef = useRef<HTMLDivElement>(null)
  // 내부 컨테이너 ref - 고정 너비 유지용
  const innerRef = useRef<HTMLDivElement>(null)
  // 드래그 중 여부
  const isDraggingRef = useRef(false)

  // ESC 키 및 외부 클릭으로 패널 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    const handleMouseDown = (e: MouseEvent) => {
      if (isOpen && innerRef.current && !innerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen, onClose])

  // 리사이즈 드래그 시작
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      isDraggingRef.current = true

      // 드래그 중 CSS transition 제거 (즉각 반응을 위해 직접 DOM 조작)
      if (outerRef.current) outerRef.current.style.transition = 'none'

      const onMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return
        const newWidth = Math.min(Math.max(window.innerWidth - e.clientX, minWidth), maxWidth)
        // 직접 DOM 조작으로 부드러운 실시간 리사이즈
        if (outerRef.current) outerRef.current.style.width = `${newWidth}px`
        if (innerRef.current) innerRef.current.style.width = `${newWidth}px`
      }

      const onMouseUp = (e: MouseEvent) => {
        isDraggingRef.current = false
        const finalWidth = Math.min(Math.max(window.innerWidth - e.clientX, minWidth), maxWidth)
        // transition 복원
        if (outerRef.current) outerRef.current.style.transition = 'width 300ms ease-in-out'
        // React state 동기화 (리사이즈 완료 후 1회 업데이트)
        onWidthChange(finalWidth)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    [minWidth, maxWidth, onWidthChange],
  )

  return (
    <div
      ref={outerRef}
      className={sidePanelStyles.outer}
      style={{
        width: isOpen ? panelWidth : 0,
        transition: 'width 300ms ease-in-out',
      }}
    >
      {/* 내부 컨테이너 - 패널이 열릴 때 실제 너비를 고정해 콘텐츠 레이아웃 유지 */}
      <div ref={innerRef} className={sidePanelStyles.inner} style={{ width: panelWidth }}>
        {/* 좌측 엣지 리사이즈 핸들 */}
        <div
          className={sidePanelStyles.resizeHandle}
          onMouseDown={handleResizeMouseDown}
          role='separator'
          aria-label='패널 너비 조절'
        >
          {/* 리사이즈 가능 표시 그립 인디케이터 */}
          <div className={sidePanelStyles.resizeGrip}>
            <span className={sidePanelStyles.resizeDot} />
            <span className={sidePanelStyles.resizeDot} />
            <span className={sidePanelStyles.resizeDot} />
            <span className={sidePanelStyles.resizeDot} />
          </div>
        </div>

        {/* 헤더 */}
        <div className={sidePanelStyles.header}>
          <h2 className={sidePanelStyles.title}>{title}</h2>
          <button
            type='button'
            className={sidePanelStyles.closeButton}
            onClick={onClose}
            aria-label={SIDE_PANEL_MSG.CLOSE}
          >
            <Icon icon={X} size='sm' />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className={sidePanelStyles.content}>{children}</div>
      </div>
    </div>
  )
}
