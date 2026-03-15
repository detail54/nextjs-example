import { cva } from 'class-variance-authority'

// 아이콘 링크 버튼 스타일 (정사각형, 아이콘 전용)
export const iconLinkButtonStyle = cva(
  'inline-flex items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
        ghost:
          'text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200 focus-visible:ring-secondary-400',
        outline:
          'border border-secondary-300 text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-400',
        danger:
          'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 focus-visible:ring-danger-500',
      },
      size: {
        sm: 'w-7 h-7',
        md: 'w-9 h-9',
        lg: 'w-11 h-11',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)
