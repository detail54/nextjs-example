import { db } from '@/server/core/db/db'
import { tasks, taskAssignees, users } from '@/server/core/db/schema'
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

  /** task 생성 (priority 직접 지정, 시작일/마감일 선택) */
  createWithPriority({
    epicId,
    title,
    priority,
    startDate,
    dueDate,
  }: {
    epicId: number
    title: string
    priority: number
    startDate?: string | null
    dueDate?: string | null
  }) {
    return db
      .insert(tasks)
      .values({ epicId, title, priority, startDate: startDate ?? null, dueDate: dueDate ?? null })
      .run().lastInsertRowid
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
  update({ id, title, description, status, startDate, dueDate, color }: UpdateTaskParams) {
    return db
      .update(tasks)
      .set({ title, description, status, startDate, dueDate, color, updatedAt: sql`CURRENT_TIMESTAMP` })
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

  /** 태스크 담당자 목록 조회 */
  getAssignees(taskId: number): { id: number; username: string }[] {
    return db
      .select({ id: users.id, username: users.username })
      .from(taskAssignees)
      .innerJoin(users, eq(taskAssignees.userId, users.id))
      .where(eq(taskAssignees.taskId, taskId))
      .all()
  },

  /** 태스크 담당자 교체 (기존 전체 삭제 후 재삽입) */
  setAssignees(taskId: number, userIds: number[]): void {
    db.delete(taskAssignees).where(eq(taskAssignees.taskId, taskId)).run()
    if (userIds.length > 0) {
      db.insert(taskAssignees)
        .values(userIds.map((userId) => ({ taskId, userId })))
        .run()
    }
  },
}
