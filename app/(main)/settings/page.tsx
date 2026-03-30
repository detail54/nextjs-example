import type { Metadata } from 'next'
import SettingsPage from '@/features/settings/components/SettingsPage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.SETTINGS }

export default function Page() {
  return <SettingsPage />
}
