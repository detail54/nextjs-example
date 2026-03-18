import { cva } from 'class-variance-authority'

export const epicAccordionStyles = {
  // 아코디언 전체 컨테이너
  container: cva('group/epic rounded-lg border border-secondary-700')(),

  // 헤더 영역 (토글 + 더보기 버튼), 열림 여부에 따라 하단 둥근 모서리 조건 적용
  header: cva(
    'flex items-center bg-secondary-800 hover:bg-secondary-700 transition-colors duration-200 rounded-t-lg',
    {
      variants: {
        open: {
          true: '',
          false: 'rounded-b-lg',
        },
      },
      defaultVariants: { open: false },
    },
  ),

  // 토글 버튼 (클릭 시 펼침/닫힘)
  toggleButton: cva('flex flex-1 items-center justify-between px-4 py-3 cursor-pointer')(),

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

  // ⋯ 버튼 래퍼 (hover 시 표시)
  moreButtonWrapper: cva(
    'flex items-center pr-2 opacity-0 group-hover/epic:opacity-100 transition-opacity duration-150',
  )(),

  // ⋯ 더보기 버튼
  moreButton: cva(
    'flex items-center justify-center rounded-md p-1 text-secondary-400' +
      ' hover:bg-secondary-600 hover:text-white transition-colors duration-150',
  )(),

  // 칸반 보드 영역
  content: cva('bg-secondary-900 p-4 rounded-b-lg')(),
}
