'use client'

import { useRouter } from 'next/navigation'
import { ShieldX } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { LNB_MSG } from '@/context/messages/lnbMsg'

// 권한 없음 페이지 컴포넌트
export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4 bg-secondary-950'>
      <Icon icon={ShieldX} size='2xl' className='text-danger-500' />
      <h1 className='text-xl font-bold text-white'>{LNB_MSG.UNAUTHORIZED_TITLE}</h1>
      <p className='text-secondary-400 text-sm'>{LNB_MSG.UNAUTHORIZED_DESC}</p>
      <button
        type='button'
        onClick={() => router.back()}
        className='mt-2 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm hover:bg-primary-700 transition-colors'
      >
        {LNB_MSG.UNAUTHORIZED_BACK}
      </button>
    </div>
  )
}
