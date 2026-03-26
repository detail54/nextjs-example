'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import BasicInput from '@/components/input/BasicInput'
import BasicTextarea from '@/components/input/BasicTextarea'
import BasicButton from '@/components/button/BasicButton'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'
import { APP_PATHS } from '@/context/appPaths'
import { noticeManageFormStyles } from './NoticeManageForm.styles'
import type { CreateNoticeRequest, UpdateNoticeRequest } from '../api/type'

type Props = {
  // 수정 모드일 때 초기값
  initialValues?: {
    title: string
    content: string
    isPinned: boolean
    isPublished: boolean
  }
  // 등록 or 수정 여부
  mode: 'create' | 'edit'
  isPending: boolean
  onSubmit: (data: CreateNoticeRequest | UpdateNoticeRequest) => void
}

// 공지사항 등록/수정 공용 폼 컴포넌트
export default function NoticeManageForm({ initialValues, mode, isPending, onSubmit }: Props) {
  const router = useRouter()

  // 제목 입력값
  const [title, setTitle] = useState(initialValues?.title ?? '')
  // 내용 입력값
  const [content, setContent] = useState(initialValues?.content ?? '')
  // 게시 여부
  const [isPublished, setIsPublished] = useState(initialValues?.isPublished ?? true)
  // 상단 고정 여부
  const [isPinned, setIsPinned] = useState(initialValues?.isPinned ?? false)
  // 필드별 에러 메시지
  const [errors, setErrors] = useState({ title: '', content: '' })

  const pageTitle =
    mode === 'create' ? NOTICE_MANAGE_MSG.NEW_PAGE_TITLE : NOTICE_MANAGE_MSG.EDIT_PAGE_TITLE

  const submitLabel =
    mode === 'create' ? NOTICE_MANAGE_MSG.SUBMIT_CREATE : NOTICE_MANAGE_MSG.SUBMIT_EDIT

  // 유효성 검사
  const validate = useCallback(() => {
    const next = { title: '', content: '' }
    if (!title.trim()) next.title = NOTICE_MANAGE_MSG.REQUIRED_TITLE
    if (!content.trim()) next.content = NOTICE_MANAGE_MSG.REQUIRED_CONTENT
    setErrors(next)
    return !next.title && !next.content
  }, [title, content])

  const handleSubmit = useCallback(() => {
    if (!validate()) return
    onSubmit({ title: title.trim(), content: content.trim(), isPinned, isPublished })
  }, [validate, onSubmit, title, content, isPinned, isPublished])

  const handleBack = useCallback(() => {
    router.push(APP_PATHS.NOTICE_MANAGE.ROOT)
  }, [router])

  return (
    <div className={noticeManageFormStyles.container}>
      <div className={noticeManageFormStyles.content}>
        {/* 헤더 */}
        <div className={noticeManageFormStyles.header}>
          <button
            type='button'
            className={noticeManageFormStyles.backButton}
            onClick={handleBack}
            aria-label='뒤로가기'
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className={noticeManageFormStyles.title}>{pageTitle}</h1>
        </div>

        {/* 폼 카드 */}
        <div className={noticeManageFormStyles.card}>
          <div className={noticeManageFormStyles.fieldList}>
            {/* 제목 */}
            <div className={noticeManageFormStyles.fieldGroup}>
              <label className={noticeManageFormStyles.label}>
                {NOTICE_MANAGE_MSG.LABEL_TITLE}
              </label>
              <BasicInput
                value={title}
                placeholder={NOTICE_MANAGE_MSG.TITLE_PLACEHOLDER}
                variant={errors.title ? 'error' : 'default'}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <span className={noticeManageFormStyles.errorText}>{errors.title}</span>
              )}
            </div>

            {/* 내용 */}
            <div className={noticeManageFormStyles.fieldGroup}>
              <label className={noticeManageFormStyles.label}>
                {NOTICE_MANAGE_MSG.LABEL_CONTENT}
              </label>
              <BasicTextarea
                value={content}
                placeholder={NOTICE_MANAGE_MSG.CONTENT_PLACEHOLDER}
                variant={errors.content ? 'error' : 'default'}
                rows={10}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <span className={noticeManageFormStyles.errorText}>{errors.content}</span>
              )}
            </div>

            {/* 게시 여부 */}
            <div className={noticeManageFormStyles.checkRow}>
              <input
                id='isPublished'
                type='checkbox'
                className={noticeManageFormStyles.checkbox}
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <label htmlFor='isPublished' className={noticeManageFormStyles.checkLabel}>
                {NOTICE_MANAGE_MSG.LABEL_IS_PUBLISHED}
              </label>
            </div>

            {/* 상단 고정 */}
            <div className={noticeManageFormStyles.checkRow}>
              <input
                id='isPinned'
                type='checkbox'
                className={noticeManageFormStyles.checkbox}
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
              />
              <label htmlFor='isPinned' className={noticeManageFormStyles.checkLabel}>
                {NOTICE_MANAGE_MSG.LABEL_IS_PINNED}
              </label>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className={noticeManageFormStyles.footer}>
            <BasicButton variant='outline-dark' size='md' onClick={handleBack} disabled={isPending}>
              {NOTICE_MANAGE_MSG.CANCEL}
            </BasicButton>
            <BasicButton size='md' onClick={handleSubmit} disabled={isPending}>
              {isPending ? NOTICE_MANAGE_MSG.SUBMITTING : submitLabel}
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  )
}
