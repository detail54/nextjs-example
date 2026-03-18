import { cva } from 'class-variance-authority'

// 모달 컨테이너
export const basicModalContainerStyle = cva(
  'relative w-full max-h-[80vh] flex flex-col rounded-xl border border-secondary-700 bg-secondary-800 shadow-xl animate-in fade-in zoom-in-95 duration-150',
)

// 모달 헤더
export const basicModalHeaderStyle = cva(
  'flex items-start justify-between px-6 py-5 border-b border-secondary-700',
)

// 모달 타이틀
export const basicModalTitleStyle = cva(
  'flex-1 pr-4 text-base font-semibold leading-snug text-white break-keep',
)

// 닫기 버튼
export const basicModalCloseButtonStyle = cva(
  'flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-md text-secondary-400' +
    ' hover:text-white hover:bg-secondary-700 transition-colors duration-150 cursor-pointer',
)

// 모달 바디 (스크롤 영역)
export const basicModalBodyStyle = cva('flex-1 overflow-y-auto px-6 py-5')

// 모달 푸터
export const basicModalFooterStyle = cva(
  'flex justify-end px-6 py-4 border-t border-secondary-700',
)
