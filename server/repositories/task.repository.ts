import { db } from '@/server/db/db'
import { tasks } from '@/server/db/schema'
import { eq, asc, sql } from 'drizzle-orm'
import type {
  CreateTaskParams,
  UpdateTaskParams,
  UpdateTaskStatusParams,
  MoveToEpicParams,
  UpdateTaskMoveParams,
} from './type'

export const taskRepository = {
  /** epic 하위 task 목록 조회 (오래된순) */
  getByEpicId(epicId: number) {
    return db
      .select()
      .from(tasks)
      .where(eq(tasks.epicId, epicId))
      .orderBy(asc(tasks.createdAt))
      .all()
  },

  /** task 단건 조회 */
  getById(id: number) {
    return db.select().from(tasks).where(eq(tasks.id, id)).get()
  },

  /** task 생성 */
  create({ epicId, title, description }: CreateTaskParams) {
    return db.insert(tasks).values({ epicId, title, description }).run().lastInsertRowid
  },

  /** task 생성 (priority 직접 지정) */
  createWithPriority({ epicId, title, priority }: { epicId: number; title: string; priority: number }) {
    return db.insert(tasks).values({ epicId, title, priority }).run().lastInsertRowid
  },

  /** task 상태 변경 */
  updateStatus({ id, status }: UpdateTaskStatusParams) {
    return db
      .update(tasks)
      .set({ status, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(tasks.id, id))
      .run()
  },

  /** task 내용 수정 */
  update({ id, title, description, status, dueDate }: UpdateTaskParams) {
    return db
      .update(tasks)
      .set({ title, description, status, dueDate, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(tasks.id, id))
      .run()
  },

  /** task를 다른 epic으로 이동 */
  moveToEpic({ taskId, epicId }: MoveToEpicParams) {
    return db
      .update(tasks)
      .set({ epicId, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(tasks.id, taskId))
      .run()
  },

  /** epic 하위 task 목록 조회 (priority ASC, createdAt ASC) */
  getByEpicIdSorted(epicId: number) {
    return db
      .select()
      .from(tasks)
      .where(eq(tasks.epicId, epicId))
      .orderBy(asc(tasks.priority), asc(tasks.createdAt))
      .all()
  },

  /** task status + priority 업데이트 (드래그앤드롭 이동) */
  updateMove({ id, status, priority }: UpdateTaskMoveParams) {
    return db
      .update(tasks)
      .set({ status, priority, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(tasks.id, id))
      .run()
  },

  /** task 삭제 */
  delete(id: number) {
    return db.delete(tasks).where(eq(tasks.id, id)).run()
  },
}
