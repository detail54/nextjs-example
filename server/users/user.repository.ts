import { db } from '@/server/core/db/db'
import { users } from '@/server/core/db/schema'
import { eq, asc, desc, count } from 'drizzle-orm'
import type { UserRole } from '@/server/core/db/type'
import type { UserSortBy, UserSortOrder, UserListItem } from './type'

export const userRepository = {
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
}
