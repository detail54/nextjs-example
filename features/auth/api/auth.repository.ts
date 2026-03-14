import { db } from '@/db/db'
import {
  type CreateUserParams,
  type UpdateUsernameParams,
  type UpdatePasswordParams,
  type UpdateRoleParams,
} from './type'

export const authRepository = {
  findByUsername(username: string) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username)
  },

  create({ username, password }: CreateUserParams) {
    return db
      .prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'USER')")
      .run(username, password)
  },

  updateUsername({ userId, username }: UpdateUsernameParams) {
    return db.prepare('UPDATE users SET username = ? WHERE id = ?').run(username, userId)
  },

  updatePassword({ userId, password }: UpdatePasswordParams) {
    return db.prepare('UPDATE users SET password = ? WHERE id = ?').run(password, userId)
  },

  updateRole({ userId, role }: UpdateRoleParams) {
    return db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId)
  },
}
