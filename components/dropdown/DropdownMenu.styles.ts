import { cva } from 'class-variance-authority'

export const dropdownMenuStyles = {
  // 드롭다운 루트 (relative 기준점)
  container: cva('relative inline-block')(),

  // 기본 트리거 버튼
  trigger: cva(
    'flex items-center justify-center rounded-md p-1 text-secondary-400' +
      ' hover:bg-secondary-600 hover:text-white transition-colors duration-150',
  )(),

  // 드롭다운 메뉴 패널 (portal로 body에 렌더링 - 위치는 inline style로 제어)
  menu: cva(
    'min-w-[100px] overflow-hidden' +
      ' rounded-md border border-secondary-600 bg-secondary-800 shadow-lg',
  )(),

  // 메뉴 아이템
  item: cva('block w-full px-3 py-2 text-left text-sm transition-colors duration-100', {
    variants: {
      danger: {
        true: 'text-danger-400 hover:bg-danger-500/10',
        false: 'text-secondary-200 hover:bg-secondary-700',
      },
    },
    defaultVariants: { danger: false },
  }),
}
