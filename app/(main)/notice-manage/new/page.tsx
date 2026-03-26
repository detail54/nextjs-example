import type { Metadata } from 'next'
import NoticeManageNewPage from '@/features/notice-manage/components/NoticeManageNewPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.NOTICE_MANAGE_NEW }

export default function Page() {
  return <NoticeManageNewPage />
}
