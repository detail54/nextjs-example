import { QueryClient } from '@tanstack/react-query'

// QueryClient 인스턴스 생성 팩토리 함수
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 1분간 fresh 상태 유지
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  })
}
