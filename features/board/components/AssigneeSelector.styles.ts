import { cva } from 'class-variance-authority'

export const assigneeSelectorStyles = {
  // 최상위 래퍼 (relative 기준)
  wrapper: cva('relative')(),

  // ── 일반 모드 ──────────────────────────────────────

  // 아바타 + 추가 버튼 행 (일반)
  avatarRow: cva('flex items-center gap-1.5 flex-wrap')(),

  // 담당자 아바타 원형 (일반)
  avatar: cva(
    'flex flex-shrink-0 items-center justify-center' +
      ' w-7 h-7 rounded-full' +
      ' text-white text-xs font-bold select-none' +
      ' ring-2 ring-secondary-800 cursor-default',
  )(),

  // 담당자 추가 버튼 (일반)
  addButton: cva(
    'flex items-center justify-center' +
      ' w-7 h-7 rounded-full' +
      ' border border-dashed border-secondary-500' +
      ' text-secondary-400 transition-colors duration-150' +
      ' hover:border-primary-400 hover:text-primary-400' +
      ' focus:outline-none focus:ring-2 focus:ring-primary-500',
  )(),

  // 빈 상태 텍스트
  empty: cva('text-xs text-secondary-500')(),

  // ── 컴팩트 모드 (카드 내 겹침 레이아웃) ────────────

  // 아바타 묶음 (컴팩트, 첫 번째 제외 음수 마진으로 겹침)
  compactAvatarRow: cva('flex items-center')(),

  // 담당자 아바타 (컴팩트, 소형 20px)
  compactAvatar: cva(
    'flex flex-shrink-0 items-center justify-center' +
      ' w-5 h-5 rounded-full' +
      ' text-white text-[10px] font-bold select-none' +
      ' ring-1 ring-secondary-700',
  )(),

  // ⋯ 더보기 버튼 (컴팩트, 2명 이상일 때 마지막에 노출)
  compactMoreButton: cva(
    'flex flex-shrink-0 items-center justify-center' +
      ' w-5 h-5 rounded-full -ml-1.5' +
      ' bg-secondary-500' +
      ' text-[9px] font-bold text-white select-none' +
      ' ring-1 ring-secondary-700' +
      ' hover:bg-secondary-400 transition-colors duration-100' +
      ' focus:outline-none',
  )(),

  // + 추가 버튼 (컴팩트, 담당자 없거나 1명일 때 노출)
  compactAddButton: cva(
    'flex flex-shrink-0 items-center justify-center' +
      ' w-5 h-5 rounded-full' +
      ' border border-dashed border-secondary-500' +
      ' text-secondary-400 transition-colors duration-100' +
      ' hover:border-primary-400 hover:text-primary-400' +
      ' focus:outline-none',
  )(),

  // ── 드롭다운 공통 ──────────────────────────────────

  // 드롭다운 패널
  dropdown: cva(
    'absolute left-0 top-full z-50 mt-2' +
      ' w-60 rounded-lg py-2' +
      ' border border-secondary-600 bg-secondary-800 shadow-xl',
  )(),

  // 드롭다운 헤더 타이틀
  dropdownTitle: cva(
    'pb-2 px-3' +
      ' border-b border-secondary-700' +
      ' text-xs font-semibold uppercase tracking-wide text-secondary-400',
  )(),

  // 나에게 할당 버튼
  assignToMe: cva(
    'flex w-full items-center gap-2 px-3 py-2' +
      ' border-b border-secondary-700' +
      ' text-xs font-medium transition-colors duration-100',
    {
      variants: {
        assigned: {
          true: 'text-primary-400 hover:bg-secondary-700',
          false: 'text-secondary-300 hover:bg-secondary-700 hover:text-white',
        },
      },
      defaultVariants: { assigned: false },
    },
  ),

  // 드롭다운 빈 상태
  dropdownEmpty: cva('px-3 py-3 text-xs text-secondary-500')(),

  // 사용자 목록 (스크롤 가능)
  userList: cva('mt-1 max-h-52 overflow-y-auto')(),

  // 사용자 항목 버튼
  userItem: cva(
    'flex w-full items-center gap-2.5 px-3 py-2 transition-colors duration-100',
    {
      variants: {
        assigned: {
          true: 'bg-primary-900/40 text-white',
          false: 'text-secondary-200 hover:bg-secondary-700',
        },
      },
      defaultVariants: { assigned: false },
    },
  ),

  // 사용자 항목 내 아바타 (소형)
  userAvatar: cva(
    'flex flex-shrink-0 items-center justify-center' +
      ' w-6 h-6 rounded-full' +
      ' text-white text-xs font-bold',
  )(),

  // 사용자명
  userName: cva('flex-1 truncate text-sm')(),

  // 체크 아이콘
  checkIcon: cva('ml-auto flex-shrink-0 text-primary-400')(),
}

// 담당자 아바타 색상 팔레트 (tailwind 안전 클래스 배열)
export const AVATAR_COLOR_LIST = [
  'bg-primary-600',
  'bg-success-600',
  'bg-warning-600',
  'bg-danger-600',
  'bg-primary-400',
  'bg-success-400',
  'bg-warning-400',
  'bg-danger-400',
] as const

/** 사용자 ID 기반으로 아바타 배경 색상 반환 */
export function getAvatarBgColor(userId: number): string {
  return AVATAR_COLOR_LIST[userId % AVATAR_COLOR_LIST.length]
}

/** 사용자명에서 이니셜 2자리 추출 */
export function getInitials(username: string): string {
  return username.slice(0, 2).toUpperCase()
}
