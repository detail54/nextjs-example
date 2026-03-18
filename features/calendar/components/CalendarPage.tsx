'use client'

import { LNB_MSG } from '@/context/messages/lnbMsg'

// 캘린더 페이지 컴포넌트 (추후 구현)
export default function CalendarPage() {
  return (
    <div className='flex items-center justify-center h-full'>
      <p className='text-secondary-400'>{LNB_MSG.CALENDAR}</p>
    </div>
  )
}
