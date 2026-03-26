'use client'

import { useRouter } from 'next/navigation'
import { APP_PATHS } from '@/context/appPaths'
import { useNoticeCreate } from '../hooks/useNoticeCreate'
import NoticeManageForm from './NoticeManageForm'

// 공지사항 등록 페이지 컴포넌트
export default function NoticeManageNewPage() {
  const router = useRouter()
  const { mutate: create, isPending } = useNoticeCreate({
    onSuccess: () => router.push(APP_PATHS.NOTICE_MANAGE.ROOT),
  })

  return (
    <NoticeManageForm
      mode='create'
      isPending={isPending}
      onSubmit={(data) => create(data)}
    />
  )
}
