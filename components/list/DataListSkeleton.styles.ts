import { cva } from 'class-variance-authority'

// 전체 래퍼 (툴바 + 테이블)
export const skeletonWrapper = cva('flex flex-col gap-3')()

// 툴바 스켈레톤 (좌/우 셀렉터)
export const skeletonToolbar = cva('flex items-center justify-between gap-3')()

// 셀렉트 박스 스켈레톤
export const skeletonSelect = cva('h-9 w-36 rounded-md bg-secondary-700 animate-pulse')()

// 테이블 래퍼
export const skeletonTableWrapper = cva(
  'w-full overflow-hidden rounded-lg border border-secondary-700',
)()

// 헤더 행
export const skeletonHeaderRow = cva('flex items-center gap-4 bg-secondary-800 px-4 py-3')()

// 바디 행
export const skeletonBodyRow = cva(
  'flex items-center gap-4 border-t border-secondary-800 px-4 py-3.5',
)()

// 셀 스켈레톤 (auto: flex-1 / fixed: shrink-0 + 인라인 width)
export const skeletonCell = cva('h-2.5 rounded bg-secondary-700 animate-pulse', {
  variants: {
    auto: {
      true: 'flex-1',
      false: 'shrink-0',
    },
  },
  defaultVariants: { auto: true },
})
