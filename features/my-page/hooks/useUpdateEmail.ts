'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateMyEmailApi } from '../api/myPageApi'
import { myPageKeys } from '../api/queryKeys'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import type { UpdateMyEmailRequest } from '../api/type'

type UseUpdateEmailOptions = {
  onSuccess?: () => void
}

// 이메일 변경 mutation 훅
export function useUpdateEmail({ onSuccess }: UseUpdateEmailOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateMyEmailRequest) => updateMyEmailApi(data),
    onSuccess: () => {
      // 프로필 쿼리 갱신
      queryClient.invalidateQueries({ queryKey: myPageKeys.profile() })
      toast.success(MY_PAGE_MSG.EMAIL_UPDATE_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? MY_PAGE_MSG.EMAIL_UPDATE_FAILED)
    },
  })
}
