import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { BasicResponse } from '@/db/type'

export type CreateTaskRequest = {
  title: string
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
