import { cva } from 'class-variance-authority'
import type { TaskStatus } from '@/server/db/type'

export const kanbanColumnStyles = {
  // 컬럼 전체 컨테이너
  container: cva('flex flex-col rounded-lg min-h-[200px] p-3 transition-all duration-150', {
    variants: {
      isOver: {
        true: 'ring-2 ring-primary-500',
        false: '',
      },
    },
    defaultVariants: { isOver: false },
  }),

  // 컬럼 헤더
  header: cva('flex items-center justify-between mb-3 px-1')(),

  // 컬럼 제목
  title: cva('text-sm font-semibold', {
    variants: {
      status: {
        todo: 'text-secondary-300',
        in_progress: 'text-warning-400',
        done: 'text-success-400',
      },
    },
    defaultVariants: { status: 'todo' },
  }),

  // task 개수 배지 (status별 색상)
  count: cva(
    'flex items-center justify-center min-w-[20px] h-5 rounded-full px-1.5 text-xs font-medium',
    {
      variants: {
        status: {
          todo: 'bg-secondary-700 text-secondary-400',
          in_progress: 'bg-warning-400/15 text-warning-400',
          done: 'bg-success-400/15 text-success-400',
        },
      },
      defaultVariants: { status: 'todo' },
    },
  ),

  // task 목록 영역
  taskList: cva('flex flex-col gap-2')(),

  // 빈 컬럼 안내
  empty: cva('text-secondary-600 text-xs text-center py-6')(),

  // 컬럼 하단 영역 (만들기 버튼 / 인라인 입력)
  footer: cva('mt-2')(),
}

// 컬럼 배경색 (status별)
export const COLUMN_BG: Record<TaskStatus, string> = {
  todo: 'bg-secondary-800',
  in_progress: 'bg-secondary-800',
  done: 'bg-secondary-800',
}
