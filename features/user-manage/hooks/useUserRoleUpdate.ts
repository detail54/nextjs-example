import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserRole } from '../api/userApi'
import { userManageKeys } from '../api/queryKeys'
import type { UserRole } from '@/server/core/db/type'

// 사용자 역할 변경 뮤테이션 훅
export function useUserRoleUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, role }: { id: number; role: UserRole }) => updateUserRole(id, { role }),
    // 역할 변경 후 전체 사용자 목록 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userManageKeys.all })
    },
  })
}
