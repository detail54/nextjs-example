import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse } from '@/db/type'

export type CreateEpicRequest = {
  title: string
  description?: string
}

// 에픽 생성 API
export async function createEpic(
  params: CreateEpicRequest,
): Promise<BasicResponse<{ id: number }>> {
  const { data } = await axios.post<BasicResponse<{ id: number }>>(
    API_PATHS.BOARD.EPIC_CREATE,
    params,
  )
  return data
}
