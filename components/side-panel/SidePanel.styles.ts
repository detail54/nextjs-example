import { cva } from 'class-variance-authority'

export const sidePanelStyles = {
  // 외부 래퍼 - 너비 애니메이션 담당 (overflow-hidden으로 슬라이드 효과)
  outer: cva('relative h-full shrink-0 overflow-hidden')(),

  // 내부 컨테이너 - 실제 UI 렌더링 (너비는 인라인 스타일로)
  inner: cva('flex h-full flex-col border-l border-secondary-700 bg-secondary-800')(),

  // 리사이즈 핸들 - 패널 좌측 엣지 드래그 영역
  resizeHandle: cva(
    'absolute left-0 top-0 z-10 h-full w-1 cursor-col-resize' +
      ' hover:bg-primary-500 transition-colors duration-150',
  )(),

  // 헤더 영역
  header: cva(
    'flex shrink-0 items-center justify-between px-5 py-4 border-b border-secondary-700',
  )(),

  // 패널 타이틀
  title: cva('text-base font-semibold text-white')(),

  // 닫기 버튼
  closeButton: cva(
    'flex items-center justify-center rounded-md p-1.5 text-secondary-400' +
      ' hover:bg-secondary-700 hover:text-white transition-colors duration-150',
  )(),

  // 콘텐츠 스크롤 영역
  content: cva('flex-1 overflow-y-auto p-5')(),
}
