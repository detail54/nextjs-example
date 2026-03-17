import { cva } from 'class-variance-authority'

// 백드롭 스타일
export const backdropStyle = cva(
  [
    'fixed inset-0 z-50',
    'flex items-center justify-center',
    'bg-black/60',
    'animate-in fade-in duration-150',
  ].join(' '),
)

// 모달 컨테이너 스타일
export const modalContainerStyle = cva(
  [
    'relative w-full',
    'rounded-xl border border-secondary-700',
    'bg-secondary-800',
    'shadow-xl',
    'animate-in fade-in zoom-in-95 duration-150',
  ].join(' '),
)
