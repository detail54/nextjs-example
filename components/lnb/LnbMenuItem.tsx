'use client'

import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { lnbItemStyle, lnbItemIconStyle, lnbItemLabelStyle, lnbAdminBadgeStyle } from './LnbMenuItem.styles'
import type { LnbMenuItemProps, LnbActionItemProps } from './type'

// 네비게이션 링크 메뉴 아이템
export function LnbMenuItem({
  label,
  path,
  icon,
  isActive,
  isCollapsed,
  showAdminBadge,
}: LnbMenuItemProps) {
  return (
    <Link
      href={path}
      className={lnbItemStyle({ isActive })}
      title={isCollapsed ? label : undefined}
    >
      <span className={lnbItemIconStyle()}>
        <Icon icon={icon} size='md' />
      </span>
      <span className={lnbItemLabelStyle({ collapsed: isCollapsed })}>
        {label}
        {/* 관리자 전용 배지 - 접힌 상태에서는 숨김 */}
        {showAdminBadge && !isCollapsed && (
          <span className={lnbAdminBadgeStyle()}>
            <ShieldCheck className='w-3 h-3' />
          </span>
        )}
      </span>
    </Link>
  )
}

// 액션 버튼 메뉴 아이템 (로그아웃 등)
export function LnbActionItem({ label, icon, isCollapsed, onClick }: LnbActionItemProps) {
  return (
    <button
      type='button'
      className={lnbItemStyle({ isActive: false })}
      title={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <span className={lnbItemIconStyle()}>
        <Icon icon={icon} size='md' />
      </span>
      <span className={lnbItemLabelStyle({ collapsed: isCollapsed })}>{label}</span>
    </button>
  )
}
