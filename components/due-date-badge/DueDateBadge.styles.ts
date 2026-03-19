import { cva } from 'class-variance-authority'

// 마감일 긴급도 레벨별 스타일
export const dueDateBadgeStyles = {
  // 래퍼: 아이콘 + 텍스트 인라인 배치
  wrapper: cva('inline-flex items-center gap-1'),

  // 긴급도 아이콘
  icon: cva('shrink-0 w-3 h-3', {
    variants: {
      level: {
        overdue: 'text-danger-400 animate-pulse',
        urgent: 'text-warning-500',
        warning: 'text-warning-300',
        normal: 'text-secondary-500',
      },
    },
    defaultVariants: { level: 'normal' },
  }),

  // 날짜 텍스트
  text: cva('text-xs font-medium', {
    variants: {
      level: {
        overdue: 'text-danger-400',
        urgent: 'text-warning-500',
        warning: 'text-warning-300',
        normal: 'text-secondary-400',
      },
    },
    defaultVariants: { level: 'normal' },
  }),
}
