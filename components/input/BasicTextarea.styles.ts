import { cva } from 'class-variance-authority'

export const textareaStyle = cva(
  'w-full resize-none rounded-md border bg-white font-medium transition-colors duration-150' +
    ' placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-offset-1' +
    ' disabled:bg-secondary-100 disabled:text-secondary-400 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'border-secondary-300 text-secondary-900 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-danger-400 text-secondary-900 focus:border-danger-500 focus:ring-danger-500',
      },
      size: {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)
