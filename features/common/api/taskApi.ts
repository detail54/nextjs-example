import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse } from '@/server/core/db/type'
import type { CreateTaskRequest, UpdateTaskRequest, TaskMoveParams } from './type'

// 태스크 생성 (todo 컬럼 맨 마지막에 추가)
export async function createTask(
  epicId: number,
  params: CreateTaskRequest,
): Promise<BasicResponse<{ id: number }>> {
  const { data } = await axios.post<BasicResponse<{ id: number }>>(
    API_PATHS.TASKS.CREATE(epicId),
    params,
  )
  return data
}

// 태스크 수정
export async function updateTask(
  id: number,
  params: UpdateTaskRequest,
): Promise<BasicResponse<null>> {
  const { data } = await axios.put<BasicResponse<null>>(API_PATHS.TASKS.UPDATE(id), params)
  return data
}

// 태스크 삭제
export async function deleteTask(id: number): Promise<BasicResponse<null>> {
  const { data } = await axios.delete<BasicResponse<null>>(API_PATHS.TASKS.DELETE(id))
  return data
}

// 태스크 이동 (status + priority 업데이트)
export async function moveTask({ id, status, priority }: TaskMoveParams): Promise<void> {
  await axios.patch<BasicResponse<null>>(API_PATHS.TASKS.MOVE(id), { status, priority })
}
