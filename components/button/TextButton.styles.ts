import { cva } from 'class-variance-authority'

export const textButtonStyle = cva(
  'inline-flex items-center justify-center rounded font-medium transition-colors duration-150' +
    ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1' +
    ' disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // 기본 - 보조 텍스트 색상
        default: 'text-secondary-400 hover:text-primary-600',
        // 주요 액션 강조
        primary: 'text-primary-600 hover:text-primary-700',
        // 위험 액션
        danger: 'text-danger-500 hover:text-danger-700',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)
