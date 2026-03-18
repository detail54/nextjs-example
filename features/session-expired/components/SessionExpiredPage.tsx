'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/stores/useModalStore'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { APP_PATHS } from '@/context/appPaths'

// 리프레시 토큰 만료 시 세션 만료 모달을 띄우는 페이지
export default function SessionExpiredPage() {
  const router = useRouter()
  const { openModal } = useModalStore()

  useEffect(() => {
    openModal({
      type: 'alert',
      title: AUTH_MSG.SESSION_EXPIRED_TITLE,
      description: AUTH_MSG.SESSION_EXPIRED_DESC,
      onConfirm: () => router.replace(APP_PATHS.HOME),
    })
  }, [openModal, router])

  // 모달이 ModalProvider(루트 레이아웃)에서 렌더링되므로 페이지 자체는 빈 화면
  return null
}
