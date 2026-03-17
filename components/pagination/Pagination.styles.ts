import { cva } from 'class-variance-authority'

// 페이지네이션 컨테이너
export const paginationContainerStyle = cva([
  'flex items-center justify-center gap-1',
  'mt-6',
].join(' '))

// 페이지 버튼 공통
export const pageButtonStyle = cva(
  [
    'flex items-center justify-center',
    'min-w-8 h-8 px-2',
    'rounded-md',
    'text-sm font-medium',
    'transition-colors duration-150',
    'cursor-pointer disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      active: {
        true: 'bg-primary-600 text-white',
        false: 'text-secondary-300 hover:bg-secondary-700 disabled:text-secondary-600 disabled:hover:bg-transparent',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
)

// 말줄임 표시
export const ellipsisStyle = cva([
  'flex items-center justify-center',
  'min-w-8 h-8',
  'text-sm text-secondary-500',
  'select-none',
].join(' '))
