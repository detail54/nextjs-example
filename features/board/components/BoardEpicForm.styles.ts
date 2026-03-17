import { cva } from 'class-variance-authority'

export const boardEpicFormStyles = {
  // 폼 전체 레이아웃
  form: cva('flex flex-col gap-5')(),

  // 개별 필드 래퍼
  field: cva('flex flex-col gap-1.5')(),

  // 라벨
  label: cva('text-sm font-medium text-secondary-300')(),

  // 필수 표시 (*)
  required: cva('ml-0.5 text-danger-400')(),

  // 텍스트에어리어 (BasicInput 스타일과 동일하게 맞춤)
  textarea: cva(
    'w-full resize-y rounded-md border border-secondary-300 bg-white px-4 py-2' +
      ' text-sm font-medium text-secondary-900 placeholder:text-secondary-400' +
      ' transition-colors duration-150 focus:border-primary-500 focus:outline-none' +
      ' focus:ring-2 focus:ring-primary-500 focus:ring-offset-1' +
      ' disabled:cursor-not-allowed disabled:bg-secondary-100 disabled:text-secondary-400',
  )(),

  // 버튼 영역
  actions: cva('flex justify-end pt-2')(),
}
