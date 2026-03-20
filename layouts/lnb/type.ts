import type { LucideIcon } from 'lucide-react'

// LNB 네비게이션 링크 아이템 props
export type LnbMenuItemProps = {
  label: string
  path: string
  icon: LucideIcon
  /** 현재 활성 메뉴 여부 */
  isActive: boolean
  /** LNB 접힘 여부 */
  isCollapsed: boolean
}

// LNB 하단 버튼(액션) 아이템 props
export type LnbActionItemProps = {
  label: string
  icon: LucideIcon
  isCollapsed: boolean
  onClick: () => void
}
