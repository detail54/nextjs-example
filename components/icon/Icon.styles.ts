import { cva } from 'class-variance-authority'

// 아이콘 크기 스타일
export const iconStyle = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
      '2xl': 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
