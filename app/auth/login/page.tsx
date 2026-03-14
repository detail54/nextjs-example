'use client'

import { useRouter } from 'next/navigation'
import AuthLoginForm from '@/features/auth/components/AuthLoginForm'

export default function LoginPage() {
  const router = useRouter()

  return (
    <AuthLoginForm
      onAddAccount={() => router.push('/auth/register')}
      onFindUsername={() => router.push('/auth/find-username')}
      onFindPassword={() => router.push('/auth/find-password')}
    />
  )
}
