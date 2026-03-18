import type { Metadata } from 'next'
import CalendarPage from '@/features/calendar/components/CalendarPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.CALENDAR }

export default function Page() {
  return <CalendarPage />
}
