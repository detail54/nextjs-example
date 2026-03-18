import { cva } from 'class-variance-authority'

// 루트 컨테이너
export const selectBoxStyles = {
  container: cva('relative inline-block')(),

  // 트리거 버튼
  trigger: cva(
    [
      'flex items-center gap-1.5 px-3 py-1.5',
      'rounded-md border border-secondary-600 bg-secondary-800',
      'text-sm text-secondary-200',
      'transition-colors duration-150',
      'hover:border-secondary-500 hover:bg-secondary-700',
    ].join(' '),
    {
      variants: {
        open: {
          true: 'border-secondary-500 bg-secondary-700',
          false: '',
        },
      },
      defaultVariants: { open: false },
    },
  ),

  // chevron 아이콘 회전
  chevron: cva('h-3.5 w-3.5 text-secondary-400 transition-transform duration-150', {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
    },
    defaultVariants: { open: false },
  }),

  // 드롭다운 패널
  menu: cva([
    'absolute left-0 top-full z-50 mt-1 min-w-full overflow-hidden',
    'rounded-md border border-secondary-600 bg-secondary-800 shadow-lg',
  ].join(' '))(),

  // 옵션 아이템
  item: cva('block w-full px-3 py-2 text-left text-sm transition-colors duration-100', {
    variants: {
      selected: {
        true: 'bg-secondary-700 text-white',
        false: 'text-secondary-200 hover:bg-secondary-700',
      },
    },
    defaultVariants: { selected: false },
  }),
}
