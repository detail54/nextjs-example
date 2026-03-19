import { cva } from 'class-variance-authority'

export const timelineTaskCreateFormStyles = {
  // 폼 전체 레이아웃
  form: cva('flex flex-col gap-5')(),

  // 개별 필드 래퍼
  field: cva('flex flex-col gap-1.5')(),

  // 라벨
  label: cva('text-sm font-medium text-secondary-300')(),

  // 필수 표시 (*)
  required: cva('ml-0.5 text-danger-400')(),

  // 버튼 영역
  actions: cva('flex justify-end pt-2')(),
}
