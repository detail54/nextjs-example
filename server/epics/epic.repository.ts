import { db } from '@/server/core/db/db'
import { epics, epicAssignees, users } from '@/server/core/db/schema'
import { eq, desc, sql } from 'drizzle-orm'
import type { CreateEpicParams, UpdateEpicParams } from './type'

export const epicRepository = {
  /** 전체 epic 목록 조회 (최신순) */
  getAll() {
    return db.select().from(epics).orderBy(desc(epics.createdAt)).all()
  },

  /** epic 단건 조회 */
  getById(id: number) {
    return db.select().from(epics).where(eq(epics.id, id)).get()
  },

  /** epic 생성 */
  create({ title, description, status, startDate, dueDate, color }: CreateEpicParams) {
    return db.insert(epics).values({ title, description, status, startDate, dueDate, color }).run()
      .lastInsertRowid
  },

  /** epic 수정 */
  update({ id, title, description, status, startDate, dueDate, color }: UpdateEpicParams) {
    return db
      .update(epics)
      .set({ title, description, status, startDate, dueDate, color, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(epics.id, id))
      .run()
  },

  /** epic 삭제 */
  delete(id: number) {
    return db.delete(epics).where(eq(epics.id, id)).run()
  },

  /** 에픽 담당자 목록 조회 */
  getAssignees(epicId: number): { id: number; username: string }[] {
    return db
      .select({ id: users.id, username: users.username })
      .from(epicAssignees)
      .innerJoin(users, eq(epicAssignees.userId, users.id))
      .where(eq(epicAssignees.epicId, epicId))
      .all()
  },

  /** 에픽 담당자 교체 (기존 전체 삭제 후 재삽입) */
  setAssignees(epicId: number, userIds: number[]): void {
    db.delete(epicAssignees).where(eq(epicAssignees.epicId, epicId)).run()
    if (userIds.length > 0) {
      db.insert(epicAssignees)
        .values(userIds.map((userId) => ({ epicId, userId })))
        .run()
    }
  },
}
