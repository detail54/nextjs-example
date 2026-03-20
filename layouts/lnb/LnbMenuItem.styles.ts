import { cva } from 'class-variance-authority'

// 메뉴 아이템 링크/버튼 공통 스타일
export const lnbItemStyle = cva(
  [
    'flex items-center',
    'w-full px-3 py-2.5 rounded-lg gap-3',
    'text-sm font-medium whitespace-nowrap overflow-hidden',
    'cursor-pointer select-none',
    'transition-colors duration-150',
  ].join(' '),
  {
    variants: {
      isActive: {
        true: 'bg-primary-600 text-white',
        false: 'text-secondary-300 hover:bg-secondary-700 hover:text-white',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

// 아이콘 고정 크기 래퍼 (접힘 시에도 아이콘은 유지)
export const lnbItemIconStyle = cva(['shrink-0'].join(' '))

// 메뉴 라벨 스타일
export const lnbItemLabelStyle = cva(
  ['transition-all duration-300 overflow-hidden'].join(' '),
  {
    variants: {
      collapsed: {
        true: 'opacity-0 w-0',
        false: 'opacity-100 w-auto',
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
)
