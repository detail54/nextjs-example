import type { UserRole } from '@/server/core/db/type'
import { LNB_MSG } from '@/context/messages/lnbMsg'
import { APP_PATHS } from './appPaths'

// 상단 메뉴 아이템 타입
export type MenuItem = {
  id: string
  label: string
  path: string
  /** lucide-react 아이콘 이름 */
  iconName: string
  /** 허용 역할 목록 - 빈 배열이면 모든 인증된 사용자 허용 */
  roles: UserRole[]
}

// 하단 메뉴 아이템 타입
export type BottomMenuItem = {
  id: string
  label: string
  iconName: string
  /** path가 있으면 링크, 없으면 버튼으로 렌더링 */
  path?: string
  roles: UserRole[]
}

// 상단 메뉴 목록 (권한별 접근 제어)
export const MENU_LIST: MenuItem[] = [
  {
    id: 'board',
    label: LNB_MSG.BOARD,
    path: APP_PATHS.BOARD.ROOT,
    iconName: 'LayoutDashboard',
    roles: [], // 모든 인증된 사용자
  },
  {
    id: 'calendar',
    label: LNB_MSG.CALENDAR,
    path: APP_PATHS.CALENDAR.ROOT,
    iconName: 'Calendar',
    roles: [], // 모든 인증된 사용자
  },
  {
    id: 'timeline',
    label: LNB_MSG.TIMELINE,
    path: APP_PATHS.TIMELINE.ROOT,
    iconName: 'GitBranch',
    roles: [], // 모든 인증된 사용자
  },
  {
    id: 'notice',
    label: LNB_MSG.NOTICE,
    path: APP_PATHS.NOTICE.ROOT,
    iconName: 'Bell',
    roles: [], // 모든 인증된 사용자
  },
  {
    id: 'notice-manage',
    label: LNB_MSG.NOTICE_MANAGE,
    path: APP_PATHS.NOTICE_MANAGE.ROOT,
    iconName: 'BellRing',
    roles: ['ADMIN'], // 관리자만 접근 가능
  },
]

// 하단 메뉴 목록
export const BOTTOM_MENU_LIST: BottomMenuItem[] = [
  {
    id: 'my-page',
    label: LNB_MSG.MY_PAGE,
    path: APP_PATHS.MY_PAGE.ROOT,
    iconName: 'UserCircle',
    roles: [],
  },
  {
    id: 'logout',
    label: LNB_MSG.LOGOUT,
    iconName: 'LogOut',
    roles: [],
  },
]
