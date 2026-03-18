import type { Metadata } from 'next'
import TimelinePage from '@/features/timeline/components/TimelinePage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.TIMELINE }

export default function Page() {
  return <TimelinePage />
}
