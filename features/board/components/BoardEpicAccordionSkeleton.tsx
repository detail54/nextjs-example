import { epicSkeletonStyles } from './BoardEpicAccordionSkeleton.styles'

type Props = {
  // 표시할 에픽 스켈레톤 개수
  count?: number
}

// 보드 에픽 아코디언 로딩 스켈레톤
export default function BoardEpicAccordionSkeleton({ count = 3 }: Props) {
  return (
    <div className={epicSkeletonStyles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={epicSkeletonStyles.container}>
          <div className={epicSkeletonStyles.header}>
            <div className={epicSkeletonStyles.title} />
            <div className={epicSkeletonStyles.count} />
            <div className={epicSkeletonStyles.chevron} />
          </div>
        </div>
      ))}
    </div>
  )
}
