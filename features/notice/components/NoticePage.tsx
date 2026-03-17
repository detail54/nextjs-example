'use client'

import { LNB_MSG } from '@/context/lnbMsg'

// 공지사항 페이지 컴포넌트 (추후 구현)
export default function NoticePage() {
  return (
    <div className='flex items-center justify-center h-full'>
      <p className='text-secondary-400'>{LNB_MSG.NOTICE}</p>
    </div>
  )
}
