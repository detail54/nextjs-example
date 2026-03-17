'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Bell,
  BellRing,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Icon from '@/components/icon/Icon'
import { LnbMenuItem, LnbActionItem } from './LnbMenuItem'
import { useModalStore } from '@/stores/useModalStore'
import {
  lnbWrapperStyle,
  lnbStyle,
  lnbToggleStyle,
  lnbLogoStyle,
  lnbLogoTextStyle,
  lnbMenuStyle,
  lnbBottomStyle,
} from './Lnb.styles'
import { MENU_LIST } from '@/context/menuConfig'
import { LNB_MSG } from '@/context/lnbMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useSession } from '@/features/auth/hooks/useSession'
import { useLogout } from '@/features/auth/hooks/useLogout'

// iconName → LucideIcon 매핑
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Bell,
  BellRing,
  UserCircle,
  LogOut,
}

// LNB 사이드바 컴포넌트
export function Lnb() {
  // LNB 접힘/펼침 상태
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { mutate: logout } = useLogout()
  const { openModal } = useModalStore()

  // 현재 역할로 접근 가능한 메뉴만 필터링 (roles 빈 배열이면 모든 역할 허용)
  const filteredMenuList = MENU_LIST.filter(
    (item) => item.roles.length === 0 || (session?.role && item.roles.includes(session.role)),
  )

  return (
    <div className={lnbWrapperStyle()}>
      <div className={lnbStyle({ collapsed: isCollapsed })}>
        {/* 접힘/펼침 토글 버튼 */}
        <button
          type='button'
          className={lnbToggleStyle()}
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? LNB_MSG.EXPAND : LNB_MSG.COLLAPSE}
        >
          <Icon icon={isCollapsed ? ChevronRight : ChevronLeft} size='sm' />
        </button>

        {/* 브랜드 로고 영역 */}
        <div className={lnbLogoStyle()}>
          <Icon icon={LayoutDashboard} size='lg' className='shrink-0 text-primary-400' />
          <span className={lnbLogoTextStyle({ collapsed: isCollapsed })}>{LNB_MSG.BRAND}</span>
        </div>

        {/* 상단 메뉴 목록 */}
        <nav className={lnbMenuStyle()}>
          {filteredMenuList.map((item) => (
            <LnbMenuItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={ICON_MAP[item.iconName]}
              isActive={pathname === item.path || pathname.startsWith(item.path + '/')}
              isCollapsed={isCollapsed}
              // 역할 제한이 있는 메뉴는 관리자 배지 표시
              showAdminBadge={item.roles.length > 0}
            />
          ))}
        </nav>

        {/* 하단 메뉴 (마이페이지 + 로그아웃) */}
        <div className={lnbBottomStyle()}>
          <LnbMenuItem
            label={LNB_MSG.MY_PAGE}
            path={APP_PATHS.MY_PAGE.ROOT}
            icon={UserCircle}
            isActive={pathname.startsWith(APP_PATHS.MY_PAGE.ROOT)}
            isCollapsed={isCollapsed}
          />
          <LnbActionItem
            label={LNB_MSG.LOGOUT}
            icon={LogOut}
            isCollapsed={isCollapsed}
            onClick={() =>
              openModal({
                type: 'confirm',
                title: LNB_MSG.LOGOUT_CONFIRM_TITLE,
                description: LNB_MSG.LOGOUT_CONFIRM_DESC,
                confirmLabel: LNB_MSG.LOGOUT,
                variant: 'danger',
                onConfirm: () => logout(),
              })
            }
          />
        </div>
      </div>
    </div>
  )
}
