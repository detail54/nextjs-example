import type { Metadata } from 'next'
import UserManagePage from '@/features/user-manage/components/UserManagePage'
import { PAGE_TITLES } from '@/context/pageTitles'

export const metadata: Metadata = { title: PAGE_TITLES.USER_MANAGE }

export default function Page() {
  return <UserManagePage />
}
