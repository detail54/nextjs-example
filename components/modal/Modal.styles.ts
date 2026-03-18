import { cva } from 'class-variance-authority'

// 공통 백드롭
export const backdropStyle = cva(
  'fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 animate-in fade-in duration-150',
)
