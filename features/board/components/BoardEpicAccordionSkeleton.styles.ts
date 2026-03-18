import { cva } from 'class-variance-authority'

export const epicSkeletonStyles = {
  // 에픽 목록 래퍼
  list: cva('flex flex-col gap-4')(),

  // 아코디언 스켈레톤 컨테이너
  container: cva('rounded-lg border border-secondary-700 overflow-hidden')(),

  // 헤더 영역
  header: cva('flex items-center gap-3 bg-secondary-800 px-4 py-3')(),

  // 에픽 제목 스켈레톤
  title: cva('h-4 w-36 rounded bg-secondary-700 animate-pulse')(),

  // 태스크 카운트 배지 스켈레톤
  count: cva('h-5 w-8 rounded-full bg-secondary-700 animate-pulse')(),

  // 우측 chevron 스켈레톤
  chevron: cva('ml-auto h-4 w-4 rounded bg-secondary-700 animate-pulse')(),
}
