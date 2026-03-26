import { cva } from 'class-variance-authority'

export const noticeManageFormStyles = {
  // 페이지 전체 컨테이너
  container: cva('h-full overflow-auto bg-secondary-900')(),

  // 콘텐츠 영역
  content: cva('mx-auto max-w-3xl p-6 pt-[60px]')(),

  // 페이지 헤더
  header: cva('mb-6 flex items-center gap-3')(),

  // 뒤로가기 버튼
  backButton: cva(
    'flex items-center justify-center rounded-md p-1.5 text-secondary-400' +
      ' hover:bg-secondary-700 hover:text-white transition-colors duration-150',
  )(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),

  // 폼 카드
  card: cva('rounded-xl border border-secondary-700 bg-secondary-800 p-6')(),

  // 폼 필드 목록
  fieldList: cva('flex flex-col gap-5')(),

  // 필드 그룹 (라벨 + 인풋)
  fieldGroup: cva('flex flex-col gap-1.5')(),

  // 라벨
  label: cva('text-sm font-medium text-secondary-300')(),

  // 에러 메시지
  errorText: cva('text-xs text-danger-400')(),

  // 체크박스 행 (checkbox + label)
  checkRow: cva('flex items-center gap-2')(),

  // 체크박스
  checkbox: cva(
    'h-4 w-4 cursor-pointer rounded border-secondary-500 bg-secondary-700' +
      ' accent-primary-500',
  )(),

  // 체크박스 라벨
  checkLabel: cva('cursor-pointer text-sm text-secondary-300')(),

  // 폼 하단 버튼 영역
  footer: cva('mt-8 flex justify-end gap-2')(),
}
