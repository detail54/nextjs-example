import { cva } from 'class-variance-authority'

export const taskCardStyles = {
  // 카드 전체 래퍼
  card: cva(
    'rounded-md p-3 bg-secondary-700 border border-secondary-600 cursor-grab active:cursor-grabbing' +
      ' select-none transition-opacity duration-150',
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

  // 카드 하단 메타 정보 행
  meta: cva('flex items-center justify-between gap-2 mt-2')(),

  // priority 배지 - 항상 우측 정렬
  priority: cva('text-xs text-secondary-500 font-mono ml-auto')(),
}
