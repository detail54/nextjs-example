'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { createQueryClient } from './queryClient'

// 전역 Provider 래퍼 - QueryClient 제공
export default function Providers({ children }: { children: React.ReactNode }) {
  // 렌더링마다 새 인스턴스 생성 방지
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
