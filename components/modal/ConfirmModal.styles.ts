import { cva } from 'class-variance-authority'

// 확인 모달 내부 레이아웃
export const confirmModalInnerStyle = cva(['flex flex-col', 'p-6 gap-5'].join(' '))

// 제목 스타일
export const confirmTitleStyle = cva(['text-base font-semibold', 'text-white'].join(' '))

// 설명 텍스트 스타일
export const confirmDescStyle = cva(['text-sm', 'text-secondary-400'].join(' '))

// 버튼 영역 스타일
export const confirmActionsStyle = cva(['flex items-center justify-end', 'gap-2'].join(' '))
