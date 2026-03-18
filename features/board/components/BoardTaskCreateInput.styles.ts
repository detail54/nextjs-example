import { cva } from 'class-variance-authority'

export const boardTaskCreateInputStyles = {
  // 카드 형태의 입력 영역 (BoardTaskCard와 동일한 배경/테두리)
  card: cva(
    'rounded-md border border-primary-600 bg-secondary-700 p-3 ring-1 ring-primary-600',
  )(),

  // 제목 입력 필드 (배경 투명, 테두리 없음)
  input: cva(
    'w-full bg-transparent text-sm font-medium leading-snug text-white outline-none' +
      ' placeholder:text-secondary-500 resize-none',
  )(),

  // 하단 영역 (저장 버튼 우측 정렬)
  footer: cva('flex justify-end mt-2')(),

  // 저장 아이콘 버튼
  saveButton: cva(
    'flex items-center justify-center rounded-md p-1.5 text-secondary-400' +
      ' hover:bg-secondary-600 hover:text-primary-400 transition-colors duration-150' +
      ' disabled:cursor-not-allowed disabled:opacity-40',
  )(),

  // 만들기 버튼
  createButton: cva(
    'flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-secondary-500 cursor-pointer' +
      ' hover:bg-secondary-700 hover:text-secondary-300 transition-colors duration-150',
  )(),
}
