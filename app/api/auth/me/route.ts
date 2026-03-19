import { NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { type BasicResponse } from '@/server/core/db/type'
import { type MeResponse } from '@/features/auth/api/type'

// 현재 로그인된 유저 세션 정보 반환
export const GET = withAuth(async (_request, { user }) => {
  return NextResponse.json<BasicResponse<MeResponse>>({
    success: true,
    data: {
      userId: user.userId,
      username: user.username,
      role: user.role,
    },
  })
})
