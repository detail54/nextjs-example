import { type LoginRequest, type LoginResponse } from './type'

// 로그인 API 호출 함수
export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? '로그인에 실패했습니다')
  }

  return response.json()
}
