import { epicRepository } from './epic.repository'
import { taskRepository } from '@/server/tasks/task.repository'
import { SERVER_EPIC_MSG } from './epic.message'
import { type EpicStatus } from '@/server/core/db/type'
import { type EpicWithTasks } from '@/features/common/api/type'
import { type ServiceResult, type ServiceDataResult } from '@/server/core/type'

// ─── 에픽 서비스 파라미터 타입 ────────────────────────────────────

type CreateEpicParams = {
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

type UpdateEpicParams = {
  id: number
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

// ─── 에픽 서비스 ──────────────────────────────────────────────────

export const epicService = {
  /** 에픽 전체 목록 조회 (태스크 포함) */
  getAll(): EpicWithTasks[] {
    const epics = epicRepository.getAll()
    return epics.map((epic) => {
      const tasks = taskRepository.getByEpicIdSorted(epic.id)
      return {
        id: epic.id,
        title: epic.title,
        description: epic.description,
        status: epic.status,
        startDate: epic.startDate,
        dueDate: epic.dueDate,
        color: epic.color ?? null,
        tasks: tasks.map((task) => ({
          id: task.id,
          epicId: task.epicId,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          dueDate: task.dueDate,
          color: task.color ?? null,
          assignees: taskRepository.getAssignees(task.id),
        })),
        assignees: epicRepository.getAssignees(epic.id),
      }
    })
  },

  /** 에픽 생성 */
  create(params: CreateEpicParams): ServiceDataResult<{ id: number }> {
    if (!params.title?.trim()) {
      return { ok: false, message: SERVER_EPIC_MSG.EPIC_TITLE_REQUIRED, status: 400 }
    }

    const id = epicRepository.create({
      title: params.title.trim(),
      description: params.description?.trim(),
      status: params.status,
      startDate: params.startDate ?? null,
      dueDate: params.dueDate ?? null,
      color: params.color ?? null,
    })

    return { ok: true, id: Number(id) }
  },

  /** 에픽 수정 */
  update(params: UpdateEpicParams): ServiceResult {
    if (!params.title?.trim()) {
      return { ok: false, message: SERVER_EPIC_MSG.EPIC_TITLE_REQUIRED, status: 400 }
    }

    epicRepository.update({
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

  /** 에픽 담당자 교체 */
  updateAssignees(epicId: number, userIds: number[]): void {
    epicRepository.setAssignees(epicId, userIds)
  },

  /** 에픽 삭제 (하위 태스크 포함) */
  delete(id: number): void {
    // FK 미적용 환경이므로 하위 태스크 먼저 삭제
    const epicTasks = taskRepository.getByEpicId(id)
    for (const task of epicTasks) {
      taskRepository.delete(task.id)
    }
    epicRepository.delete(id)
  },
}
