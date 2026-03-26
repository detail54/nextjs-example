import { cva } from 'class-variance-authority'

export const noticeManagePageStyles = {
  // 페이지 전체 컨테이너
  container: cva('h-full overflow-auto bg-secondary-900')(),

  // 콘텐츠 영역
  content: cva('mx-auto max-w-4xl p-6 pt-[60px]')(),

  // 페이지 헤더
  header: cva('mb-6 flex items-center justify-between')(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),

  // 게시 상태 뱃지
  publishedBadge: cva('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', {
    variants: {
      published: {
        true: 'bg-success-900 text-success-300',
        false: 'bg-secondary-700 text-secondary-400',
      },
    },
    defaultVariants: { published: false },
  }),

  // 고정 상태 뱃지
  pinnedBadge: cva('text-xs font-medium', {
    variants: {
      pinned: {
        true: 'text-warning-400',
        false: 'text-secondary-600',
      },
    },
    defaultVariants: { pinned: false },
  }),

  // 액션 버튼 그룹
  actionGroup: cva('flex items-center gap-1 whitespace-nowrap')(),
}
