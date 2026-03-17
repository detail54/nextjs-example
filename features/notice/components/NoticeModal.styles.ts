import { cva } from 'class-variance-authority'

// 백드롭
export const backdropStyle = cva([
  'fixed inset-0 z-50',
  'flex items-center justify-center px-4',
  'bg-black/60',
  'animate-in fade-in duration-150',
].join(' '))

// 모달 컨테이너
export const modalContainerStyle = cva([
  'relative w-full max-w-2xl max-h-[80vh]',
  'flex flex-col',
  'rounded-xl border border-secondary-700',
  'bg-secondary-800',
  'shadow-xl',
  'animate-in fade-in zoom-in-95 duration-150',
].join(' '))

// 모달 헤더
export const modalHeaderStyle = cva([
  'flex items-start justify-between',
  'px-6 py-5',
  'border-b border-secondary-700',
].join(' '))

// 모달 타이틀
export const modalTitleStyle = cva([
  'flex-1 pr-4',
  'text-base font-semibold leading-snug',
  'text-white',
  'break-keep',
].join(' '))

// 닫기 버튼
export const closeButtonStyle = cva([
  'flex-shrink-0',
  'flex items-center justify-center w-7 h-7',
  'rounded-md',
  'text-secondary-400 hover:text-white hover:bg-secondary-700',
  'transition-colors duration-150',
  'cursor-pointer',
].join(' '))

// 모달 바디 (스크롤 영역)
export const modalBodyStyle = cva([
  'flex-1 overflow-y-auto',
  'px-6 py-5',
].join(' '))

// 컨텐츠 텍스트
export const contentTextStyle = cva([
  'text-sm leading-relaxed',
  'text-secondary-300',
  'whitespace-pre-wrap break-keep',
].join(' '))

// 모달 푸터
export const modalFooterStyle = cva([
  'flex justify-end',
  'px-6 py-4',
  'border-t border-secondary-700',
].join(' '))
