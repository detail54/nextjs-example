import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { ListResponse, BasicResponse } from '@/db/type'
import type { EpicWithTasks, TaskMoveParams } from './type'

// 보드 전체 조회
export async function getBoardList(): Promise<EpicWithTasks[]> {
  const response = await axios.get<ListResponse<EpicWithTasks>>(API_PATHS.BOARD.LIST)
  return response.data.data
}

// task 이동 (status + priority 업데이트)
export async function moveTask({ id, status, priority }: TaskMoveParams): Promise<void> {
  await axios.patch<BasicResponse<null>>(API_PATHS.BOARD.TASK_MOVE(id), { status, priority })
}
