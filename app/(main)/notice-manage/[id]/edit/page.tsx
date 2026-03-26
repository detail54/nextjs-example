import type { Metadata } from 'next'
import NoticeManageEditPage from '@/features/notice-manage/components/NoticeManageEditPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.NOTICE_MANAGE_EDIT }

type Props = { params: Promise<{ id: string }> }

export default async function Page({ params }: Props) {
  const { id } = await params
  return <NoticeManageEditPage id={Number(id)} />
}
