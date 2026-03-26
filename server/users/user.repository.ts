import { db } from '@/server/core/db/db'
import { users } from '@/server/core/db/schema'
import { eq, asc, desc, count, ne, and } from 'drizzle-orm'
import type { UserRole } from '@/server/core/db/type'
import type { UserSortBy, UserSortOrder, UserListItem, SimpleUser, UserProfile } from './type'

export const userRepository = {
  /** ID로 프로필 조회 (이메일 포함) */
  findProfile(id: number): UserProfile | undefined {
    return db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .get() as UserProfile | undefined
  },

  /** 이메일 중복 확인 (자신 제외) */
  findByEmailExcludeSelf(email: string, excludeId: number) {
    return db
      .select({ id: users.id })
      .from(users)
      .where(and(eq(users.email, email), ne(users.id, excludeId)))
      .get()
  },

  /** 이메일 변경 */
  updateEmail(id: number, email: string): void {
    db.update(users).set({ email }).where(eq(users.id, id)).run()
  },

  /** 비밀번호 변경 */
  updatePassword(id: number, password: string): void {
    db.update(users).set({ password }).where(eq(users.id, id)).run()
  },

  /** 전체 사용자 수 조회 */
  countAll(): number {
    const result = db.select({ total: count() }).from(users).get()
    return result?.total ?? 0
  },

  /** 사용자 목록 페이지 조회 (정렬 지원) */
  getList(
    page: number,
    pageSize: number,
    sortBy: UserSortBy = 'createdAt',
    sortOrder: UserSortOrder = 'desc',
  ): UserListItem[] {
    const sortCol = sortBy === 'username' ? users.username : users.createdAt
    const orderFn = sortOrder === 'asc' ? asc : desc

    return db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(orderFn(sortCol))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .all() as UserListItem[]
  },

  /** 특정 사용자 존재 여부 확인 */
  findById(id: number) {
    return db.select({ id: users.id }).from(users).where(eq(users.id, id)).get()
  },

  /** 사용자 역할 변경 */
  updateRole(id: number, role: UserRole): void {
    db.update(users).set({ role }).where(eq(users.id, id)).run()
  },

  /** 전체 사용자 목록 조회 (담당자 선택용, 페이지네이션 없음) */
  getAll(): SimpleUser[] {
    return db
      .select({ id: users.id, username: users.username })
      .from(users)
      .orderBy(asc(users.username))
      .all()
  },
}
