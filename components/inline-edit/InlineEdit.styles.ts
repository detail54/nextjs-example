import { cva } from 'class-variance-authority'

export const inlineEditStyles = {
  // 래퍼
  wrapper: cva('w-full')(),

  // 표시 모드 - 호버 시 배경색 변경
  display: cva(
    'w-full cursor-pointer rounded-md px-3 py-2 text-sm text-white' +
      ' hover:bg-secondary-700 transition-colors duration-150 min-h-[36px] break-words whitespace-pre-wrap',
  )(),

  // 빈 값 표시
  emptyText: cva('text-secondary-500 text-sm')(),

  // 편집 모드 input / textarea 공통
  input: cva(
    'w-full rounded-md border border-primary-500 bg-secondary-700 px-3 py-2' +
      ' text-sm text-white outline-none placeholder:text-secondary-500 resize-none',
  )(),

  // 액션 버튼 영역 (저장, 취소)
  actions: cva('flex justify-end gap-1 mt-1.5')(),

  // 저장 버튼 (체크)
  saveButton: cva(
    'flex items-center justify-center rounded-md p-1.5 text-secondary-400' +
      ' hover:bg-secondary-600 hover:text-success-400 transition-colors duration-150',
  )(),

  // 취소 버튼 (엑스)
  cancelButton: cva(
    'flex items-center justify-center rounded-md p-1.5 text-secondary-400' +
      ' hover:bg-secondary-600 hover:text-danger-400 transition-colors duration-150',
  )(),
}
