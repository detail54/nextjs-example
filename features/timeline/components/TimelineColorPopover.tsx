'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ColorPicker from '@/components/colorpicker/ColorPicker'

interface TimelineColorPopoverProps {
  // 팝오버 위치 (클릭 좌표 기준)
  position: { x: number; y: number }
  // 현재 선택 색상
  value: string | null
  // 색상 선택 시 콜백
  onChange: (color: string | null) => void
  // 팝오버 닫기
  onClose: () => void
}

// 타임라인 바 클릭 시 표시되는 색상 선택 팝오버
export default function TimelineColorPopover({
  position,
  value,
  onChange,
  onClose,
}: TimelineColorPopoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지 → 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleColorChange = (color: string | null) => {
    onChange(color)
    onClose()
  }

  return createPortal(
    <div
      ref={ref}
      className='fixed z-[10000] rounded-lg bg-secondary-800 border border-secondary-600 shadow-xl p-3 w-[332px]'
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -110%)' }}
    >
      <ColorPicker value={value} onChange={handleColorChange} />
    </div>,
    document.body,
  )
}
