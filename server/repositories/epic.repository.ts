import { db } from '@/server/db/db'
import { epics } from '@/server/db/schema'
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
}
