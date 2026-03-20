import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { PageResponse } from '@/server/core/db/type'
import type { UserItem, UserListParams, UpdateUserRoleRequest } from './type'

// 사용자 목록 조회
export async function getUserList(params: UserListParams): Promise<PageResponse<UserItem>> {
  const response = await axios.get<PageResponse<UserItem>>(API_PATHS.USERS.LIST, { params })
  return response.data
}

// 사용자 역할 변경
export async function updateUserRole(id: number, body: UpdateUserRoleRequest): Promise<void> {
  await axios.patch(API_PATHS.USERS.UPDATE_ROLE(id), body)
}
