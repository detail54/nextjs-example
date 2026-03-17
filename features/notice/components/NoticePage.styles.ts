import { cva } from 'class-variance-authority'

export const noticePageStyles = {
  // 페이지 전체 컨테이너
  container: cva('h-full overflow-auto bg-secondary-900')(),

  // 콘텐츠 영역
  content: cva('mx-auto max-w-4xl p-6')(),

  // 페이지 헤더
  header: cva('mb-6')(),

  // 페이지 타이틀
  title: cva('text-2xl font-bold text-white')(),
}
