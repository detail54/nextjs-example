import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse, TaskStatus } from '@/server/db/type'

export type CreateTaskRequest = {
  title: string
}

export type UpdateTaskRequest = {
  title: string
  description?: string
  status?: TaskStatus
  startDate?: string | null
  dueDate?: string | null
}

// 태스크 내용 수정 API (title + description)
export async function updateTask(
  id: number,
  params: UpdateTaskRequest,
): Promise<BasicResponse<null>> {
  const { data } = await axios.put<BasicResponse<null>>(API_PATHS.BOARD.TASK_UPDATE(id), params)
  return data
}

// 태스크 생성 API (todo 컬럼 맨 마지막에 추가)
export async function createTask(
  epicId: number,
  params: CreateTaskRequest,
): Promise<BasicResponse<{ id: number }>> {
  const { data } = await axios.post<BasicResponse<{ id: number }>>(
    API_PATHS.BOARD.TASK_CREATE(epicId),
    params,
  )
  return data
}
