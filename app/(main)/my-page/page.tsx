import type { Metadata } from 'next'
import MyPage from '@/features/my-page/components/MyPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.MY_PAGE }

export default function Page() {
  return <MyPage />
}
