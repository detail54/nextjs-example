'use client'

import { useRouter } from 'next/navigation'
import { APP_PATHS } from '@/context/appPaths'
import { useNoticeManageDetail } from '../hooks/useNoticeManageDetail'
import { useNoticeUpdate } from '../hooks/useNoticeUpdate'
import { DEFAULT_NOTICE_MANAGE_PAGE_SIZE } from '../hooks/useNoticeManageQuery'
import NoticeManageForm from './NoticeManageForm'

type Props = {
  id: number
}

// 공지사항 수정 페이지 컴포넌트
export default function NoticeManageEditPage({ id }: Props) {
  const router = useRouter()
  const { data: notice, isLoading } = useNoticeManageDetail(id)

  const { mutate: update, isPending } = useNoticeUpdate({
    // 목록 첫 페이지 기준으로 해당 쿼리 갱신
    page: 1,
    pageSize: DEFAULT_NOTICE_MANAGE_PAGE_SIZE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    onSuccess: () => router.push(APP_PATHS.NOTICE_MANAGE.ROOT),
  })

  // 데이터 로딩 중이면 폼 미렌더링 (useState 초기값 보장)
  if (isLoading || !notice) return null

  return (
    <NoticeManageForm
      mode='edit'
      initialValues={{
        title: notice.title,
        content: notice.content,
        isPinned: notice.isPinned,
        isPublished: notice.isPublished,
      }}
      isPending={isPending}
      onSubmit={(data) => update({ id, data })}
    />
  )
}
