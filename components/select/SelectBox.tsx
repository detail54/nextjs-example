'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { selectBoxStyles } from './SelectBox.styles'

/** 셀렉트 옵션 타입 */
export type SelectOption = {
  label: string
  value: number | string
}

type SelectBoxProps = {
  /** 현재 선택된 값 */
  value: number | string
  /** 선택 옵션 목록 */
  options: SelectOption[]
  /** 선택 변경 콜백 */
  onChange: (value: number | string) => void
}

// 선택 드롭다운 공통 컴포넌트
export default function SelectBox({ value, options, onChange }: SelectBoxProps) {
  // 드롭다운 열림 상태
  const [isOpen, setIsOpen] = useState(false)
  // 드롭다운 위치 (portal 렌더링용)
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? ''

  // 드롭다운 열릴 때 트리거 위치 계산
  const handleOpen = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      })
    }
    setIsOpen((prev) => !prev)
  }

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  return (
    <div ref={containerRef} className={selectBoxStyles.container}>
      <button
        ref={triggerRef}
        type='button'
        className={selectBoxStyles.trigger({ open: isOpen })}
        onClick={handleOpen}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={selectBoxStyles.chevron({ open: isOpen })} />
      </button>

      {/* overflow:hidden 부모에 가려지지 않도록 portal로 body에 렌더링 */}
      {isOpen &&
        menuPos &&
        createPortal(
          <div
            className={selectBoxStyles.menu}
            role='listbox'
            style={{ position: 'fixed', top: menuPos.top, left: menuPos.left, minWidth: menuPos.width }}
          >
            {options.map((opt) => (
              <button
                key={String(opt.value)}
                type='button'
                role='option'
                aria-selected={opt.value === value}
                className={selectBoxStyles.item({ selected: opt.value === value })}
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}
