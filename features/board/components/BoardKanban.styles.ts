import { cva } from 'class-variance-authority'

export const kanbanStyles = {
  // 3컬럼 그리드
  grid: cva('grid grid-cols-3 gap-4')(),
}
