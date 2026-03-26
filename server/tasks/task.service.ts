import { taskRepository } from './task.repository'
import { SERVER_TASK_MSG } from './task.message'
import { type TaskStatus } from '@/server/core/db/type'
import { type ServiceResult, type ServiceDataResult } from '@/server/core/type'

// ─── 태스크 서비스 파라미터 타입 ──────────────────────────────────

type CreateTaskParams = {
  epicId: number
  title: string
  startDate?: string | null
  dueDate?: string | null
}

type UpdateTaskParams = {
  id: number
  title: string
  description?: string
  status?: TaskStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

type MoveTaskParams = {
  id: number
  status: TaskStatus
  priority: number
}

// ─── 태스크 서비스 ────────────────────────────────────────────────

export const taskService = {
  /** 태스크 생성 (todo 컬럼 맨 마지막 priority로 자동 계산) */
  create(params: CreateTaskParams): ServiceDataResult<{ id: number }> {
    if (!params.title?.trim()) {
      return { ok: false, message: SERVER_TASK_MSG.TASK_TITLE_REQUIRED, status: 400 }
    }

    // todo 상태 tasks 중 가장 높은 priority 조회 후 맨 마지막에 추가
    const allTasks = taskRepository.getByEpicIdSorted(params.epicId)
    const todoTasks = allTasks.filter((t) => t.status === 'todo')
    const maxPriority = todoTasks.length > 0 ? Math.max(...todoTasks.map((t) => t.priority)) : 0
    const newPriority = maxPriority + 1000

    const id = taskRepository.createWithPriority({
      epicId: params.epicId,
      title: params.title.trim(),
      priority: newPriority,
      startDate: params.startDate ?? null,
      dueDate: params.dueDate ?? null,
    })

    return { ok: true, id: Number(id) }
  },

  /** 태스크 이동 (status + priority 업데이트) */
  move(params: MoveTaskParams): void {
    taskRepository.updateMove({ id: params.id, status: params.status, priority: params.priority })
  },

  /** 태스크 수정 */
  update(params: UpdateTaskParams): ServiceResult {
    if (!params.title?.trim()) {
      return { ok: false, message: SERVER_TASK_MSG.TASK_CONTENT_TITLE_REQUIRED, status: 400 }
    }

    taskRepository.update({
      id: params.id,
      title: params.title.trim(),
      description: params.description?.trim(),
      status: params.status,
      startDate: params.startDate,
      dueDate: params.dueDate,
      color: params.color,
    })

    return { ok: true }
  },

  /** 태스크 담당자 교체 */
  updateAssignees(taskId: number, userIds: number[]): void {
    taskRepository.setAssignees(taskId, userIds)
  },

  /** 태스크 삭제 */
  delete(id: number): void {
    taskRepository.delete(id)
  },
}
