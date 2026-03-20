import { NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { userService } from '@/server/users/user.service'
import type { ListResponse } from '@/server/core/db/type'
import type { SimpleUser } from '@/server/users/type'

// 전체 사용자 목록 조회 (담당자 선택용, 인증된 사용자 모두 접근 가능)
export const GET = withAuth(async () => {
  const data = userService.getAll()
  return NextResponse.json<ListResponse<SimpleUser>>({ success: true, data })
})
