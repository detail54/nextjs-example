import { db } from '@/db/db'
import {
  type CreateTaskParams,
  type UpdateTaskParams,
  type UpdateTaskStatusParams,
  type MoveToEpicParams,
} from './type'

export const taskRepository = {
  getByEpicId(epicId: number) {
    return db.prepare('SELECT * FROM tasks WHERE epic_id = ? ORDER BY created_at ASC').all(epicId)
  },

  getById(id: number) {
    return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
  },

  create({ epicId, title, description }: CreateTaskParams) {
    const result = db
      .prepare('INSERT INTO tasks (epic_id, title, description) VALUES (?, ?, ?)')
      .run(epicId, title, description)

    return result.lastInsertRowid
  },

  updateStatus({ id, status }: UpdateTaskStatusParams) {
    return db
      .prepare('UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, id)
  },

  update({ id, title, description }: UpdateTaskParams) {
    return db
      .prepare(
        'UPDATE tasks SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      )
      .run(title, description, id)
  },

  moveToEpic({ taskId, epicId }: MoveToEpicParams) {
    return db
      .prepare('UPDATE tasks SET epic_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(epicId, taskId)
  },

  delete(id: number) {
    return db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
  },
}
