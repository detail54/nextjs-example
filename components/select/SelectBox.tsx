'use client'

import { useEffect, useRef, useState } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? ''

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
        type='button'
        className={selectBoxStyles.trigger({ open: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={selectBoxStyles.chevron({ open: isOpen })} />
      </button>

      {isOpen && (
        <div className={selectBoxStyles.menu} role='listbox'>
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
        </div>
      )}
    </div>
  )
}
