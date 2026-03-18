import type { Metadata } from 'next'
import BoardPage from '@/features/board/components/BoardPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.BOARD }

export default function Page() {
  return <BoardPage />
}
