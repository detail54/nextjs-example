import { cva } from 'class-variance-authority'

// 모달 컨테이너
export const confirmContainerStyle = cva(
  'relative w-full max-w-sm rounded-xl border border-secondary-700 bg-secondary-800 shadow-xl' +
    ' animate-in fade-in zoom-in-95 duration-150',
)

// 확인 모달 내부 레이아웃
export const confirmModalInnerStyle = cva('flex flex-col p-6 gap-5')

// 제목 스타일
export const confirmTitleStyle = cva('text-base font-semibold text-white')

// 설명 텍스트 스타일
export const confirmDescStyle = cva('text-sm text-secondary-400')

// 버튼 영역 스타일
export const confirmActionsStyle = cva('flex items-center justify-end gap-2')
