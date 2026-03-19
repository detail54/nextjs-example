import { db } from '@/server/db/db'
import { users } from '@/server/db/schema'
import { eq, and } from 'drizzle-orm'
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

  /** email로 유저 단건 조회 */
  findByEmail(email: string) {
    return db.select().from(users).where(eq(users.email, email)).get()
  },

  /** username + email 동시 일치 조회 (비밀번호 찾기 검증용) */
  findByUsernameAndEmail(username: string, email: string) {
    return db
      .select()
      .from(users)
      .where(and(eq(users.username, username), eq(users.email, email)))
      .get()
  },

  /** 유저 생성 */
  create({ username, email, password }: CreateUserParams) {
    return db.insert(users).values({ username, email, password, role: 'USER' }).run()
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
