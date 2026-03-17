'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import BasicButton from '@/components/button/BasicButton'
import { AUTH_MSG } from '@/context/authMsg'
import { APP_PATHS } from '@/context/appPaths'

// 401 - 로그인이 필요한 페이지
export default function LoginRequiredPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4 bg-secondary-950'>
      <Icon icon={Lock} size='2xl' className='text-warning-400' />
      <h1 className='text-xl font-bold text-white'>{AUTH_MSG.UNAUTHORIZED}</h1>
      <p className='text-secondary-400 text-sm'>{AUTH_MSG.LOGIN_REQUIRED_DESC}</p>
      <Link href={APP_PATHS.AUTH.LOGIN}>
        <BasicButton variant='primary' size='md'>
          {AUTH_MSG.LOGIN_REQUIRED_BUTTON}
        </BasicButton>
      </Link>
    </div>
  )
}
