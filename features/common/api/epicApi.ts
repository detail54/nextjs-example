import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse, ListResponse } from '@/server/db/type'
import type { EpicWithTasks, CreateEpicRequest, UpdateEpicRequest } from './type'

// 에픽 전체 목록 조회 (태스크 포함)
export async function getEpicList(): Promise<EpicWithTasks[]> {
  const response = await axios.get<ListResponse<EpicWithTasks>>(API_PATHS.EPICS.LIST)
  return response.data.data
}

// 에픽 생성
export async function createEpic(params: CreateEpicRequest): Promise<BasicResponse<{ id: number }>> {
  const { data } = await axios.post<BasicResponse<{ id: number }>>(API_PATHS.EPICS.CREATE, params)
  return data
}

// 에픽 수정
export async function updateEpic({ id, ...body }: UpdateEpicRequest): Promise<BasicResponse<null>> {
  const { data } = await axios.put<BasicResponse<null>>(API_PATHS.EPICS.UPDATE(id), body)
  return data
}

// 에픽 삭제
export async function deleteEpic(id: number): Promise<BasicResponse<null>> {
  const { data } = await axios.delete<BasicResponse<null>>(API_PATHS.EPICS.DELETE(id))
  return data
}
