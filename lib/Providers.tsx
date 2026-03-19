'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import ModalProvider from '@/components/modal/ModalProvider'
import { createQueryClient } from './queryClient'

// 전역 Provider 래퍼 - QueryClient 및 모달 제공
export default function Providers({ children }: { children: React.ReactNode }) {
  // 렌더링마다 새 인스턴스 생성 방지
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 전역 모달 - useConfirmModalStore / useBasicModalStore로 제어 */}
      <ModalProvider />
      {/* 개발 환경에서만 표시 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
