import { cva } from 'class-variance-authority'

export const buttonStyle = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',
        secondary:
          'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300 focus-visible:ring-secondary-400',
        danger:
          'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 focus-visible:ring-danger-500',
        ghost:
          'text-secondary-600 hover:bg-secondary-100 active:bg-secondary-200 focus-visible:ring-secondary-400',
        outline:
          'border border-secondary-300 text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-400',
      },
      size: {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
