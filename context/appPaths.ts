// 앱 페이지 라우트 경로 중앙 관리
export const APP_PATHS = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FIND_USERNAME: '/auth/find-username',
    FIND_PASSWORD: '/auth/find-password',
  },
  BOARD: {
    ROOT: '/board',
  },
  CALENDAR: {
    ROOT: '/calendar',
  },
  TIMELINE: {
    ROOT: '/timeline',
  },
  NOTICE: {
    ROOT: '/notice',
  },
  NOTICE_MANAGE: {
    ROOT: '/notice-manage',
  },
  MY_PAGE: {
    ROOT: '/my-page',
  },
  UNAUTHORIZED: '/unauthorized',
  /** 401 - 토큰 없음 (미로그인 상태로 보호 경로 접근) */
  LOGIN_REQUIRED: '/login-required',
  /** 리프레시 토큰 만료 - 세션 만료 모달 표시 */
  SESSION_EXPIRED: '/session-expired',
} as const
