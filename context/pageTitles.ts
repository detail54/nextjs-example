import { LNB_MSG } from './messages/lnbMsg'

// "서비스명 - 페이지명" 형식으로 타이틀 생성
const t = (pageName: string) => `${LNB_MSG.BRAND} - ${pageName}`

// 페이지별 타이틀 중앙 관리
export const PAGE_TITLES = {
  HOME: LNB_MSG.BRAND,
  BOARD: t(LNB_MSG.BOARD),
  CALENDAR: t(LNB_MSG.CALENDAR),
  TIMELINE: t(LNB_MSG.TIMELINE),
  NOTICE: t(LNB_MSG.NOTICE),
  NOTICE_MANAGE: t(LNB_MSG.NOTICE_MANAGE),
  NOTICE_MANAGE_NEW: t('공지 등록'),
  NOTICE_MANAGE_EDIT: t('공지 수정'),
  USER_MANAGE: t(LNB_MSG.USER_MANAGE),
  MY_PAGE: t(LNB_MSG.MY_PAGE),
} as const
