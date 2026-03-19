'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
// portal로 body에 렌더링해 overflow 클리핑 방지
export default function DropdownMenu({ trigger, items, triggerClassName }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  // 메뉴 fixed 위치 (트리거 기준 계산)
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({})
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // 트리거 위치 기반으로 메뉴 위치 계산
  const calcMenuStyle = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
      zIndex: 9999,
    })
  }

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return
    const handleMouseDown = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      )
        return
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  return (
    <div className={dropdownMenuStyles.container}>
      <button
        ref={triggerRef}
        type='button'
        className={triggerClassName ?? dropdownMenuStyles.trigger}
        onClick={(e) => {
          e.stopPropagation()
          calcMenuStyle()
          setIsOpen((prev) => !prev)
        }}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      {isOpen &&
        createPortal(
          <div ref={menuRef} style={menuStyle} className={dropdownMenuStyles.menu} role='menu'>
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
          </div>,
          document.body,
        )}
    </div>
  )
}
