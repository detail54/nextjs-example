import type { Metadata } from 'next'
import NoticeManagePage from '@/features/notice-manage/components/NoticeManagePage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.NOTICE_MANAGE }

export default function Page() {
  return <NoticeManagePage />
}
