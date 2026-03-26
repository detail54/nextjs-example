import { cva } from 'class-variance-authority'

export const myPagePasswordInlineEditStyles = {
  // 필드 그룹 (라벨 + 인풋)
  fieldGroup: cva('flex flex-col gap-1.5')(),

  // 라벨
  label: cva('text-xs font-medium text-secondary-400')(),

  // 에러 메시지
  errorText: cva('text-xs text-danger-400')(),

  // 일치 확인 메시지
  matchText: cva('text-xs text-success-400')(),

  // 버튼 영역
  footer: cva('flex justify-end gap-2 pt-1')(),
}
