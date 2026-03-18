import { cva } from 'class-variance-authority'

export const boardPageStyles = {
  // 페이지 전체 컨테이너 - flex row로 패널과 나란히 배치
  container: cva('flex h-full bg-secondary-900')(),

  // 콘텐츠 영역 - 패널이 열리면 flex에 의해 자연스럽게 밀림
  content: cva('flex-1 min-w-0 overflow-auto p-6 pt-[60px]')(),

  // 헤더 - 타이틀과 등록 버튼
  header: cva('flex items-center justify-between mb-6')(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),

  // 에픽 목록 컨테이너
  epicList: cva('flex flex-col gap-4')(),

  // 빈 상태 메시지
  empty: cva('text-secondary-400 text-center py-16')(),
}
