import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse, EpicStatus } from '@/server/db/type'

export type CreateEpicRequest = {
  title: string
  description?: string
}

export type UpdateEpicRequest = {
  id: number
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
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

// 에픽 수정 API
export async function updateEpic({ id, ...body }: UpdateEpicRequest): Promise<BasicResponse<null>> {
  const { data } = await axios.put<BasicResponse<null>>(API_PATHS.BOARD.EPIC_UPDATE(id), body)
  return data
}

// 에픽 삭제 API
export async function deleteEpic(id: number): Promise<BasicResponse<null>> {
  const { data } = await axios.delete<BasicResponse<null>>(API_PATHS.BOARD.EPIC_DELETE(id))
  return data
}
