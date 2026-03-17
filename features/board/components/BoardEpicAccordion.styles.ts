import { cva } from 'class-variance-authority'

export const epicAccordionStyles = {
  // 아코디언 전체 컨테이너
  container: cva('rounded-lg border border-secondary-700 overflow-hidden')(),

  // 헤더 버튼
  header: cva(
    'w-full flex items-center justify-between px-4 py-3 bg-secondary-800 hover:bg-secondary-700 transition-colors duration-200 cursor-pointer',
  )(),

  // 헤더 왼쪽: 제목 + 카운트
  headerLeft: cva('flex items-center gap-3')(),

  // epic 제목
  epicTitle: cva('text-white font-semibold text-base')(),

  // task 개수 배지
  taskCount: cva('text-xs text-secondary-400 bg-secondary-700 px-2 py-0.5 rounded-full')(),

  // 화살표 아이콘 래퍼 (애니메이션)
  chevronWrapper: cva('text-secondary-400 transition-transform duration-200', {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
    },
    defaultVariants: { open: false },
  }),

  // 칸반 보드 영역
  content: cva('bg-secondary-900 p-4')(),
}
