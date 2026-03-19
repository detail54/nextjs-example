import { cva } from 'class-variance-authority'

export const timelineEpicRowStyles = {
  // 에픽 행 래퍼
  epicRow: cva('flex border-b border-secondary-600 group/epic-row'),

  // 왼쪽 에픽 정보 영역 (sticky) - 열림 variant 없음, 항상 동일
  epicLeft: cva(
    'flex items-center gap-1 px-2 border-r border-secondary-700 bg-secondary-900 sticky left-0 z-10',
  )(),

  // 화살표 토글 버튼
  toggleBtn: cva(
    'flex items-center justify-center w-6 h-6 flex-shrink-0 rounded' +
      ' text-secondary-400 hover:text-white hover:bg-secondary-700 transition-colors duration-150',
  )(),

  // 에픽 제목
  epicTitle: cva('flex-1 min-w-0 text-sm font-semibold text-white truncate')(),

  // ⋯ 더보기 버튼 래퍼 (hover 시 표시)
  moreWrapper: cva(
    'flex-shrink-0 opacity-0 group-hover/epic-row:opacity-100 transition-opacity duration-150',
  )(),

  // ⋯ 더보기 버튼
  moreBtn: cva(
    'flex items-center justify-center rounded-md p-1 text-secondary-400' +
      ' hover:bg-secondary-700 hover:text-white transition-colors duration-150',
  )(),

  // 오른쪽 타임라인 영역 (바 위치잡기 기준)
  epicRight: cva('relative flex-shrink-0')(),

  // 에픽 바 (status variant - active/inactive/completed)
  epicBar: cva(
    'absolute rounded-md flex items-center px-2 overflow-hidden cursor-default select-none',
    {
      variants: {
        status: {
          active: 'bg-primary-600',
          inactive: 'bg-secondary-500',
          completed: 'bg-success-600',
        },
      },
      defaultVariants: { status: 'active' },
    },
  ),

  // 에픽 바 내 텍스트
  epicBarText: cva('text-xs text-white font-medium truncate')(),

  // 오늘 표시선
  todayLine: cva('absolute top-0 bottom-0 w-0.5 bg-primary-400 z-[5]')(),

  // 태스크 행 래퍼
  taskRow: cva('flex border-b border-secondary-600/60 group/task-row'),

  // 왼쪽 태스크 정보 영역 (sticky, 들여쓰기)
  taskLeft: cva(
    'flex items-center gap-2 pl-14 pr-2 border-r border-secondary-700/60' +
      ' bg-secondary-900/95 sticky left-0 z-10',
  )(),

  // 태스크 제목
  taskTitle: cva('flex-1 min-w-0 text-xs text-secondary-300 truncate')(),

  // 오른쪽 태스크 타임라인 영역
  taskRight: cva('relative flex-shrink-0')(),

  // 태스크 바
  taskBar: cva(
    'absolute rounded flex items-center px-1.5 overflow-hidden cursor-default select-none bg-primary-400',
  )(),

  // 태스크 바 내 텍스트
  taskBarText: cva('text-xs text-white truncate')(),

  // 월 구분 세로선
  monthLine: cva('absolute top-0 bottom-0 w-px bg-secondary-600')(),

  // 현재 월 배경 하이라이트
  currentMonthBg: cva('absolute top-0 bottom-0 bg-primary-900/10')(),
}
