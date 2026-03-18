import type { Metadata } from 'next'
import NoticePage from '@/features/notice/components/NoticePage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.NOTICE }

export default function Page() {
  return <NoticePage />
}
