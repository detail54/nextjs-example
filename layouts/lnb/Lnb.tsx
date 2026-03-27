'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Bell,
  BellRing,
  Users,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  SunDim,
  Contrast,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Icon from '@/components/icon/Icon'
import { LnbMenuItem, LnbActionItem } from './LnbMenuItem'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useThemeStore } from '@/stores/useThemeStore'
import {
  lnbWrapperStyle,
  lnbStyle,
  lnbToggleStyle,
  lnbLogoStyle,
  lnbLogoTextStyle,
  lnbMenuStyle,
  lnbBottomStyle,
  lnbDividerStyle,
  lnbSectionLabelStyle,
} from './Lnb.styles'
import { COMMON_MENU_LIST, ADMIN_MENU_LIST } from '@/context/menuConfig'
import { LNB_MSG } from '@/context/messages/lnbMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useSession } from '@/features/auth/hooks/useSession'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { USER_ROLE } from '@/context/constants'

// iconName → LucideIcon 매핑
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Bell,
  BellRing,
  Users,
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
  const { openConfirmModal } = useConfirmModalStore()
  const { theme, setTheme } = useThemeStore()

  // 현재 유저가 어드민인지 여부
  const isAdmin = session?.role === USER_ROLE.ADMIN

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
          <Image src='/icon.svg' alt='logo' width={24} height={24} className='shrink-0 rounded-sm' />
          <span className={lnbLogoTextStyle({ collapsed: isCollapsed })}>{LNB_MSG.BRAND}</span>
        </div>

        {/* 상단 메뉴 목록 */}
        <nav className={lnbMenuStyle()}>
          {/* 공통 메뉴 */}
          {COMMON_MENU_LIST.map((item) => (
            <LnbMenuItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={ICON_MAP[item.iconName]}
              isActive={pathname === item.path || pathname.startsWith(item.path + '/')}
              isCollapsed={isCollapsed}
            />
          ))}

          {/* 관리자 전용 메뉴 섹션 */}
          {isAdmin && (
            <>
              <div className={lnbDividerStyle()} />
              <span className={lnbSectionLabelStyle({ collapsed: isCollapsed })}>
                {LNB_MSG.ADMIN_SECTION}
              </span>
              {ADMIN_MENU_LIST.map((item) => (
                <LnbMenuItem
                  key={item.id}
                  label={item.label}
                  path={item.path}
                  icon={ICON_MAP[item.iconName]}
                  isActive={pathname === item.path || pathname.startsWith(item.path + '/')}
                  isCollapsed={isCollapsed}
                />
              ))}
            </>
          )}
        </nav>

        {/* 하단 메뉴 (테마 토글 + 마이페이지 + 로그아웃) */}
        <div className={lnbBottomStyle()}>
          {/* 테마 전환 - dark → olive → blue → white → dark 순환 */}
          <LnbActionItem
            label={
              theme === 'dark'
                ? LNB_MSG.THEME_OLIVE
                : theme === 'olive'
                  ? LNB_MSG.THEME_BLUE
                  : theme === 'blue'
                    ? LNB_MSG.THEME_WHITE
                    : LNB_MSG.THEME_DARK
            }
            icon={theme === 'dark' ? Sun : theme === 'olive' ? SunDim : theme === 'blue' ? Contrast : Moon}
            isCollapsed={isCollapsed}
            onClick={() =>
              setTheme(
                theme === 'dark' ? 'olive' : theme === 'olive' ? 'blue' : theme === 'blue' ? 'white' : 'dark',
              )
            }
          />
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
              openConfirmModal({
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
