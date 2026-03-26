'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateMyPasswordApi } from '../api/myPageApi'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import type { UpdateMyPasswordRequest } from '../api/type'

type UseUpdatePasswordOptions = {
  onSuccess?: () => void
}

// 비밀번호 변경 mutation 훅
export function useUpdatePassword({ onSuccess }: UseUpdatePasswordOptions = {}) {
  return useMutation({
    mutationFn: (data: UpdateMyPasswordRequest) => updateMyPasswordApi(data),
    onSuccess: () => {
      toast.success(MY_PAGE_MSG.PASSWORD_UPDATE_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? MY_PAGE_MSG.PASSWORD_UPDATE_FAILED)
    },
  })
}
