'use client'

import { useEffect, useRef, useState } from 'react'
import { dropdownMenuStyles } from './DropdownMenu.styles'

export type DropdownMenuItem = {
  label: string
  onClick: () => void
  // danger 스타일 적용 여부 (삭제 등)
  danger?: boolean
}

type DropdownMenuProps = {
  // 트리거 버튼 내용
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  // 트리거 버튼 추가 className
  triggerClassName?: string
}

// 트리거 버튼 클릭 시 드롭다운 메뉴 표시 컴포넌트
export default function DropdownMenu({ trigger, items, triggerClassName }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
    <div ref={containerRef} className={dropdownMenuStyles.container}>
      <button
        type='button'
        className={triggerClassName ?? dropdownMenuStyles.trigger}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className={dropdownMenuStyles.menu} role='menu'>
          {items.map((item) => (
            <button
              key={item.label}
              type='button'
              role='menuitem'
              className={dropdownMenuStyles.item({ danger: item.danger })}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                item.onClick()
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
