import { cva } from 'class-variance-authority'

export const tooltipStyles = {
  // 툴팁 말풍선 본체
  box: cva(
    'pointer-events-none whitespace-nowrap rounded-md px-2.5 py-1.5' +
      ' bg-secondary-800 border border-secondary-600' +
      ' text-xs text-secondary-100 shadow-lg',
  )(),
}
