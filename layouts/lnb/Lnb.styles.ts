import { cva } from 'class-variance-authority'

// LNB 외부 래퍼 - relative 포지션으로 토글 버튼 기준점 역할
export const lnbWrapperStyle = cva(['relative', 'h-screen shrink-0'].join(' '))

// LNB 컨테이너 스타일
export const lnbStyle = cva(
  [
    'flex flex-col',
    'h-full',
    'bg-secondary-900 border-r border-secondary-700',
    'overflow-hidden',
    'transition-[width] duration-300 ease-in-out',
  ].join(' '),
  {
    variants: {
      collapsed: {
        true: 'w-16',
        false: 'w-60',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
)

// 접힘/펼침 토글 버튼 스타일
export const lnbToggleStyle = cva(
  [
    'absolute -right-3 top-6 z-10',
    'flex items-center justify-center',
    'w-6 h-6 rounded-full',
    'bg-secondary-700 border border-secondary-600',
    'text-secondary-300 cursor-pointer',
    'hover:bg-secondary-600 hover:text-white',
    'transition-colors duration-150',
  ].join(' '),
)

// 로고 영역 스타일
export const lnbLogoStyle = cva(
  [
    'flex items-center shrink-0',
    'h-14 px-3',
    'border-b border-secondary-700',
    'overflow-hidden',
  ].join(' '),
)

// 로고 텍스트 스타일
export const lnbLogoTextStyle = cva(
  ['ml-2 font-bold whitespace-nowrap', 'text-white text-sm', 'transition-all duration-300'].join(' '),
  {
    variants: {
      collapsed: {
        true: 'opacity-0 w-0 ml-0',
        false: 'opacity-100 w-auto',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
)

// 메뉴 영역 스타일
export const lnbMenuStyle = cva(
  ['flex-1 flex flex-col', 'px-2 py-3 gap-1', 'overflow-y-auto overflow-x-hidden'].join(' '),
)

// 하단 영역 스타일
export const lnbBottomStyle = cva(
  ['flex flex-col shrink-0', 'px-2 py-3 gap-1', 'border-t border-secondary-700'].join(' '),
)
