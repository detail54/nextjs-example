'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { createQueryClient } from './queryClient'

// 전역 Provider 래퍼 - QueryClient 제공
export default function Providers({ children }: { children: React.ReactNode }) {
  // 렌더링마다 새 인스턴스 생성 방지
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 표시 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
