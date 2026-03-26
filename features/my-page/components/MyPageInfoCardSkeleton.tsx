'use client'

import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import { myPageInfoCardStyles } from './MyPageInfoCard.styles'
import { myPageInfoCardSkeletonStyles } from './MyPageInfoCardSkeleton.styles'

// 행별 스켈레톤 값 너비 순서
const SKELETON_WIDTHS = ['sm', 'md', 'lg', 'md'] as const

// 계정 정보 카드 스켈레톤 컴포넌트
export default function MyPageInfoCardSkeleton() {
  return (
    <div className={myPageInfoCardStyles.card}>
      <div className={myPageInfoCardStyles.sectionTitle}>{MY_PAGE_MSG.SECTION_PROFILE}</div>
      <div className={myPageInfoCardStyles.list}>
        {SKELETON_WIDTHS.map((width, i) => (
          <div key={i} className={myPageInfoCardSkeletonStyles.row}>
            <div className={myPageInfoCardSkeletonStyles.label} />
            <div className={myPageInfoCardSkeletonStyles.value({ width })} />
          </div>
        ))}
      </div>
    </div>
  )
}
