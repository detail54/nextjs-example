import { cva } from 'class-variance-authority'

// 전체 래퍼 (툴바 + 테이블)
export const listWrapperStyle = cva('flex flex-col gap-3')()

// 툴바 (페이지 사이즈 셀렉터 등) - 우측 정렬
export const listToolbarStyle = cva('flex items-center justify-end')()

// 테이블 래퍼
export const tableWrapperStyle = cva([
  'w-full',
  'overflow-hidden',
  'rounded-lg border border-secondary-700',
].join(' '))

// 테이블 전체
export const tableStyle = cva(['w-full', 'border-collapse'].join(' '))

// 헤더 행
export const headerRowStyle = cva(['bg-secondary-800'].join(' '))

// 헤더 셀
export const headerCellStyle = cva([
  'px-4 py-3',
  'text-left text-xs font-medium tracking-wide',
  'text-secondary-400',
].join(' '))

// 바디 행
export const bodyRowStyle = cva(
  ['border-t border-secondary-800', 'transition-colors duration-150'].join(' '),
  {
    variants: {
      clickable: {
        true: 'cursor-pointer hover:bg-secondary-800',
        false: '',
      },
    },
    defaultVariants: {
      clickable: false,
    },
  },
)

// 바디 셀
export const bodyCellStyle = cva(['px-4 py-3.5', 'text-sm text-secondary-200'].join(' '))

// 빈 상태 셀
export const emptyCellStyle = cva([
  'px-4 py-16',
  'text-center text-sm',
  'text-secondary-500',
].join(' '))
