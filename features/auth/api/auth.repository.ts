import { db } from '@/db/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type {
  CreateUserParams,
  UpdateUsernameParams,
  UpdatePasswordParams,
  UpdateRoleParams,
} from './type'

export const authRepository = {
  /** username으로 유저 단건 조회 */
  findByUsername(username: string) {
    return db.select().from(users).where(eq(users.username, username)).get()
  },

  /** 유저 생성 */
  create({ username, password }: CreateUserParams) {
    return db.insert(users).values({ username, password, role: 'USER' }).run()
  },

  /** username 변경 */
  updateUsername({ userId, username }: UpdateUsernameParams) {
    return db.update(users).set({ username }).where(eq(users.id, userId)).run()
  },

  /** 비밀번호 변경 */
  updatePassword({ userId, password }: UpdatePasswordParams) {
    return db.update(users).set({ password }).where(eq(users.id, userId)).run()
  },

  /** 역할 변경 */
  updateRole({ userId, role }: UpdateRoleParams) {
    return db.update(users).set({ role }).where(eq(users.id, userId)).run()
  },
}
