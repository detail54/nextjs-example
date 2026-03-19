import { cva } from 'class-variance-authority'

export const calendarStyles = {
  // 페이지 전체 컨테이너
  container: cva('flex h-full bg-secondary-900')(),

  // 콘텐츠 영역
  content: cva('flex-1 min-w-0 overflow-hidden flex flex-col pt-[60px]')(),

  // 페이지 헤더
  header: cva('flex items-center justify-between px-6 py-4 flex-shrink-0')(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),

  // 월 내비게이션 바
  navBar: cva('flex items-center gap-3')(),

  // 이전/다음 달 버튼
  navBtn: cva(
    'flex items-center justify-center w-8 h-8 rounded-md text-secondary-400' +
      ' hover:text-white hover:bg-secondary-700 transition-colors duration-150',
  )(),

  // 연월 레이블
  monthLabel: cva('text-base font-semibold text-white min-w-[110px] text-center')(),

  // 캘린더 스크롤 래퍼
  calendarWrapper: cva('flex-1 overflow-auto px-6 pb-6')(),

  // 캘린더 전체 그리드 래퍼 (둥근 테두리)
  calendarGrid: cva('rounded-xl overflow-hidden border border-secondary-700')(),

  // 요일 헤더 행
  dayHeaderRow: cva('grid grid-cols-7 bg-secondary-800 border-b border-secondary-700')(),

  // 요일 헤더 셀 (일/토 색상 variant)
  dayHeaderCell: cva('py-3 text-center text-xs font-semibold tracking-wide', {
    variants: {
      day: {
        sun: 'text-danger-400',
        sat: 'text-primary-400',
        weekday: 'text-secondary-400',
      },
    },
    defaultVariants: { day: 'weekday' },
  }),

  // 주 행 (relative 기준점)
  weekRow: cva('relative border-b border-secondary-700 last:border-b-0')(),

  // 에픽 바 더보기 버튼
  moreBtn: cva(
    'text-xs text-secondary-400 hover:text-primary-400 px-2 text-left' +
      ' transition-colors duration-150 truncate cursor-pointer',
  )(),

  // 빈 상태
  emptyState: cva('flex-1 flex items-center justify-center text-secondary-400 text-sm')(),
}
