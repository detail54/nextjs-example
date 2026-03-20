import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { ListResponse } from '@/server/core/db/type'
import type { Assignee } from './type'

// 전체 사용자 목록 조회 (담당자 선택용)
export async function getAllUsers(): Promise<Assignee[]> {
  const { data } = await axios.get<ListResponse<Assignee>>(API_PATHS.USERS.ALL)
  return data.data
}
