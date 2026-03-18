import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/lib/withAuth'
import { epicRepository } from '@/server/repositories/epic.repository'
import { taskRepository } from '@/server/repositories/task.repository'
import type { ListResponse } from '@/server/db/type'
import type { EpicWithTasks } from '@/features/board/api/type'

// 보드 전체 조회 (epic 목록 + 각 epic의 task 목록)
export const GET = withAuth(async (_request: NextRequest) => {
  const epics = epicRepository.getAll()

  const data: EpicWithTasks[] = epics.map((epic) => {
    const tasks = taskRepository.getByEpicIdSorted(epic.id)
    return {
      id: epic.id,
      title: epic.title,
      description: epic.description,
      status: epic.status,
      dueDate: epic.dueDate,
      tasks: tasks.map((task) => ({
        id: task.id,
        epicId: task.epicId,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      })),
    }
  })

  return NextResponse.json<ListResponse<EpicWithTasks>>({ success: true, data })
})
