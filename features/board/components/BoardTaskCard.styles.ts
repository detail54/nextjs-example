import { cva } from 'class-variance-authority'

export const taskCardStyles = {
  // 카드 전체 래퍼
  card: cva(
    'rounded-md p-3 bg-secondary-700 border border-secondary-600 cursor-grab active:cursor-grabbing select-none transition-opacity duration-150',
    {
      variants: {
        isDragging: {
          true: 'opacity-40',
          false: 'opacity-100',
        },
        isOverlay: {
          true: 'shadow-xl ring-2 ring-primary-500 cursor-grabbing',
          false: '',
        },
      },
      defaultVariants: { isDragging: false, isOverlay: false },
    },
  ),

  // 카드 제목
  title: cva('text-sm text-white font-medium leading-snug mb-1')(),

  // 카드 하단 메타 정보
  meta: cva('flex items-center justify-between mt-2')(),

  // 마감일
  dueDate: cva('text-xs text-secondary-400')(),

  // priority 배지
  priority: cva('text-xs text-secondary-500 font-mono')(),
}
