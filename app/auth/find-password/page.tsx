import AuthFindPasswordForm from '@/features/auth/components/AuthFindPasswordForm'

type Props = {
  searchParams: Promise<{ username?: string }>
}

// 아이디 찾기에서 넘어온 경우 searchParams로 username 전달
export default async function FindPasswordPage({ searchParams }: Props) {
  const { username } = await searchParams
  return <AuthFindPasswordForm initialUsername={username} />
}
