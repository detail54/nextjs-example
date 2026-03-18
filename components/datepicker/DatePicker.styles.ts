import { cva } from 'class-variance-authority'

export const datePickerStyles = {
  // 날짜 선택 input
  input: cva(
    'w-full rounded-md border border-secondary-600 bg-secondary-800 px-3 py-1.5' +
      ' text-sm text-secondary-200' +
      ' transition-colors duration-150' +
      ' focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1' +
      ' disabled:cursor-not-allowed disabled:opacity-50',
  )(),
}
