import { cva } from 'class-variance-authority'

export const myPageInfoCardSkeletonStyles = {
  // 스켈레톤 행
  row: cva('flex items-center gap-4')(),

  // 스켈레톤 라벨 블록
  label: cva('h-4 w-16 animate-pulse rounded bg-secondary-700')(),

  // 스켈레톤 값 블록 (너비 다양하게)
  value: cva('h-4 animate-pulse rounded bg-secondary-700', {
    variants: {
      width: {
        sm: 'w-24',
        md: 'w-40',
        lg: 'w-56',
      },
    },
    defaultVariants: { width: 'md' },
  }),
}
