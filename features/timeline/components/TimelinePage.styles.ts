import { cva } from 'class-variance-authority'

export const timelinePageStyles = {
  // 페이지 전체 컨테이너 (보드와 동일 패턴)
  container: cva('flex h-full bg-secondary-900')(),

  // 콘텐츠 영역 (패널 열리면 패널이 옆에서 차지)
  content: cva('flex-1 min-w-0 overflow-hidden flex flex-col pt-[60px]')(),

  // 페이지 헤더
  header: cva('flex items-center justify-between px-6 py-4 flex-shrink-0')(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),

  // 타임라인 스크롤 컨테이너 (단일 스크롤 영역)
  scrollArea: cva('flex-1 overflow-auto')(),

  // 헤더 행 (sticky top)
  headerRow: cva('flex sticky top-0 z-20 bg-secondary-900 border-b border-secondary-700')(),

  // 헤더 왼쪽 코너 (sticky top + left, 리사이즈 핸들 포함)
  headerCorner: cva(
    'relative flex items-center px-4 border-r-2 border-secondary-600 bg-secondary-900 sticky left-0 z-30 flex-shrink-0',
  )(),

  // 구분선 리사이즈 핸들 (헤더 코너 우측 끝에 위치)
  resizeHandle: cva(
    'absolute right-0 top-0 bottom-0 w-3 cursor-col-resize translate-x-1/2 z-10',
  )(),

  // 헤더 코너 텍스트
  headerCornerText: cva('text-xs font-medium text-secondary-400 uppercase tracking-wider')(),

  // 월 헤더 셀 (current variant) - border-l 사용으로 monthLine(left: i*MONTH_WIDTH)과 1px 정확히 일치
  monthCell: cva(
    'flex items-center justify-center flex-shrink-0 text-xs font-medium py-3',
    {
      variants: {
        current: {
          true: 'text-primary-400 bg-primary-900/20',
          false: 'text-secondary-400',
        },
      },
      defaultVariants: { current: false },
    },
  ),

  // 빈 상태 메시지 행
  emptyRow: cva('flex')(),

  // 빈 상태 왼쪽 (sticky)
  emptyLeft: cva(
    'flex items-center justify-center px-4 border-r-2 border-secondary-600' +
      ' bg-secondary-900 sticky left-0 z-10 flex-shrink-0',
  )(),

  // 빈 상태 텍스트
  emptyText: cva('text-secondary-400 text-sm')(),

  // 에픽 등록 버튼 행
  addEpicRow: cva('flex border-b border-secondary-700/30')(),

  // 에픽 등록 버튼 왼쪽 (sticky)
  addEpicLeft: cva(
    'flex items-center px-3 py-2 border-r-2 border-secondary-600 bg-secondary-900 sticky left-0 z-10 flex-shrink-0',
  )(),

  // 에픽 등록 버튼
  addEpicBtn: cva(
    'flex items-center gap-1.5 text-sm text-secondary-400 hover:text-primary-400' +
      ' transition-colors duration-150 rounded-md px-2 py-1.5 hover:bg-secondary-800',
  )(),

  // 에픽 등록 버튼 오른쪽 빈 영역
  addEpicRight: cva('flex-shrink-0 bg-secondary-900/50')(),
}
