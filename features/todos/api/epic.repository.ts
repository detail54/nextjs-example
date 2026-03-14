import { db } from '@/db/db'
import { type CreateEpicParams, type UpdateEpicParams } from './type'

export const epicRepository = {
  getAll() {
    return db.prepare('SELECT * FROM epics ORDER BY created_at DESC').all()
  },

  getById(id: number) {
    return db.prepare('SELECT * FROM epics WHERE id = ?').get(id)
  },

  create({ title, description }: CreateEpicParams) {
    const result = db
      .prepare('INSERT INTO epics (title, description) VALUES (?, ?)')
      .run(title, description)

    return result.lastInsertRowid
  },

  update({ id, title, description }: UpdateEpicParams) {
    return db
      .prepare(
        'UPDATE epics SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      )
      .run(title, description, id)
  },

  delete(id: number) {
    return db.prepare('DELETE FROM epics WHERE id = ?').run(id)
  },
}
