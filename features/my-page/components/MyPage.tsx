'use client'

import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import { useMyProfile } from '../hooks/useMyProfile'
import MyPageInfoCard from './MyPageInfoCard'
import { myPageStyles } from './MyPage.styles'

// 마이페이지 컴포넌트
export default function MyPage() {
  const { data: profile, isLoading } = useMyProfile()

  return (
    <div className={myPageStyles.container}>
      <div className={myPageStyles.content}>
        <div className={myPageStyles.header}>
          <h1 className={myPageStyles.title}>{MY_PAGE_MSG.PAGE_TITLE}</h1>
        </div>

        <MyPageInfoCard profile={profile} isLoading={isLoading} />
      </div>
    </div>
  )
}
