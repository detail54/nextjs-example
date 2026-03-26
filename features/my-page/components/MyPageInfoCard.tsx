'use client'

import { useState, useCallback } from 'react'
import BasicButton from '@/components/button/BasicButton'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import { USER_ROLE } from '@/context/constants'
import { formatDate } from '../utils/myPageUtils'
import { myPageInfoCardStyles } from './MyPageInfoCard.styles'
import MyPageInfoCardSkeleton from './MyPageInfoCardSkeleton'
import MyPageEmailInlineEdit from './MyPageEmailInlineEdit'
import MyPagePasswordInlineEdit from './MyPagePasswordInlineEdit'
import type { MyProfileResponse } from '../api/type'

type Props = {
  profile: MyProfileResponse | undefined
  isLoading: boolean
}

// 계정 정보 카드 컴포넌트
export default function MyPageInfoCard({ profile, isLoading }: Props) {
  // 이메일 인라인 편집 열림 여부
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  // 비밀번호 인라인 편집 열림 여부
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)

  const handleEmailToggle = useCallback(() => setIsEmailOpen((prev) => !prev), [])
  const handlePasswordToggle = useCallback(() => setIsPasswordOpen((prev) => !prev), [])
  const handleEmailClose = useCallback(() => setIsEmailOpen(false), [])
  const handlePasswordClose = useCallback(() => setIsPasswordOpen(false), [])

  if (isLoading || !profile) return <MyPageInfoCardSkeleton />

  const roleLabel =
    profile.role === USER_ROLE.ADMIN ? MY_PAGE_MSG.ROLE_ADMIN : MY_PAGE_MSG.ROLE_USER

  return (
    <div className={myPageInfoCardStyles.card}>
      <h2 className={myPageInfoCardStyles.sectionTitle}>{MY_PAGE_MSG.SECTION_PROFILE}</h2>
      <div className={myPageInfoCardStyles.list}>

        {/* 아이디 */}
        <div className={myPageInfoCardStyles.row}>
          <span className={myPageInfoCardStyles.label}>{MY_PAGE_MSG.LABEL_USERNAME}</span>
          <span className={myPageInfoCardStyles.value}>{profile.username}</span>
        </div>

        {/* 비밀번호 */}
        <div className={myPageInfoCardStyles.row}>
          <span className={myPageInfoCardStyles.label}>{MY_PAGE_MSG.LABEL_PASSWORD}</span>
          <div className={myPageInfoCardStyles.valueRow}>
            <span className={myPageInfoCardStyles.value}>{MY_PAGE_MSG.PASSWORD_MASKED}</span>
            <BasicButton variant='outline-dark' size='sm' onClick={handlePasswordToggle}>
              {isPasswordOpen ? MY_PAGE_MSG.CANCEL : MY_PAGE_MSG.TOGGLE_OPEN}
            </BasicButton>
          </div>
        </div>

        {/* 비밀번호 인라인 편집 */}
        {isPasswordOpen && (
          <div className={myPageInfoCardStyles.inlineEdit}>
            <MyPagePasswordInlineEdit onClose={handlePasswordClose} />
          </div>
        )}

        {/* 이메일 */}
        <div className={myPageInfoCardStyles.row}>
          <span className={myPageInfoCardStyles.label}>{MY_PAGE_MSG.LABEL_EMAIL}</span>
          <div className={myPageInfoCardStyles.valueRow}>
            <span className={myPageInfoCardStyles.value}>{profile.email}</span>
            <BasicButton variant='outline-dark' size='sm' onClick={handleEmailToggle}>
              {isEmailOpen ? MY_PAGE_MSG.CANCEL : MY_PAGE_MSG.TOGGLE_OPEN}
            </BasicButton>
          </div>
        </div>

        {/* 이메일 인라인 편집 */}
        {isEmailOpen && (
          <div className={myPageInfoCardStyles.inlineEdit}>
            <MyPageEmailInlineEdit onClose={handleEmailClose} />
          </div>
        )}

        {/* 권한 */}
        <div className={myPageInfoCardStyles.row}>
          <span className={myPageInfoCardStyles.label}>{MY_PAGE_MSG.LABEL_ROLE}</span>
          <span className={myPageInfoCardStyles.roleBadge({ role: profile.role })}>
            {roleLabel}
          </span>
        </div>

        {/* 가입일 */}
        <div className={myPageInfoCardStyles.row}>
          <span className={myPageInfoCardStyles.label}>{MY_PAGE_MSG.LABEL_CREATED_AT}</span>
          <span className={myPageInfoCardStyles.value}>{formatDate(profile.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}
