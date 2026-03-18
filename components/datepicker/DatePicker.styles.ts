import { cva } from 'class-variance-authority'

export const datePickerStyles = {
  // 루트 컨테이너
  container: cva('relative inline-block w-full')(),

  // 트리거 버튼
  trigger: cva(
    'flex w-full items-center gap-2 rounded-md border border-secondary-600 bg-secondary-800' +
      ' px-3 py-1.5 text-sm transition-colors duration-150' +
      ' hover:border-secondary-500 hover:bg-secondary-700',
    {
      variants: {
        hasValue: {
          true: 'text-secondary-200',
          false: 'text-secondary-500',
        },
      },
      defaultVariants: { hasValue: false },
    },
  ),

  // 캘린더 패널
  panel: cva(
    'absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border border-secondary-600' +
      ' bg-secondary-800 p-3 shadow-xl',
  )(),

  // 헤더 (월 이동)
  header: cva('mb-3 flex items-center justify-between')(),

  // 월/년 표시 텍스트
  monthLabel: cva('text-sm font-semibold text-secondary-100')(),

  // 이전/다음 버튼
  navButton: cva(
    'flex h-7 w-7 items-center justify-center rounded-md text-secondary-400' +
      ' transition-colors duration-100 hover:bg-secondary-700 hover:text-secondary-100',
  )(),

  // 요일 헤더 그리드
  dayHeaders: cva('mb-1 grid grid-cols-7')(),

  // 요일 라벨 (일~토)
  dayLabel: cva('flex h-8 items-center justify-center text-xs font-medium text-secondary-500')(),

  // 날짜 그리드
  daysGrid: cva('grid grid-cols-7 gap-y-0.5')(),

  // 날짜 셀
  dayCell: cva(
    'flex h-8 w-full items-center justify-center rounded-md text-sm transition-colors duration-100',
    {
      variants: {
        state: {
          // 일반
          default: 'text-secondary-200 hover:bg-secondary-700',
          // 오늘
          today: 'font-semibold text-primary-400 hover:bg-secondary-700',
          // 선택됨
          selected: 'bg-primary-600 font-semibold text-white hover:bg-primary-500',
          // 오늘 + 선택됨
          todaySelected: 'bg-primary-600 font-semibold text-white hover:bg-primary-500',
          // 다른 달
          outside: 'text-secondary-600 hover:bg-secondary-700',
          // 빈 셀
          empty: '',
        },
      },
      defaultVariants: { state: 'default' },
    },
  ),

  // 하단 초기화 버튼 영역
  footer: cva('mt-2 border-t border-secondary-700 pt-2')(),

  // 초기화 버튼
  clearButton: cva('text-xs text-secondary-400 transition-colors duration-100 hover:text-secondary-200')(),
}
