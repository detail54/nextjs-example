import { db } from '@/server/core/db/db'
import { notices, users } from '@/server/core/db/schema'
import { eq, desc, asc, count } from 'drizzle-orm'

export const noticeRepository = {
  /** 게시된 공지사항 전체 건수 조회 */
  countPublished(): number {
    const result = db
      .select({ total: count() })
      .from(notices)
      .where(eq(notices.isPublished, true))
      .get()
    return result?.total ?? 0
  },

  /** 게시된 공지사항 페이지 목록 조회 (작성자 join, 정렬 지원) */
  getPublished(
    page: number,
    pageSize: number,
    sortBy: 'createdAt' | 'title' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    const sortCol = sortBy === 'title' ? notices.title : notices.createdAt
    const orderFn = sortOrder === 'asc' ? asc : desc

    return db
      .select({
        id: notices.id,
        title: notices.title,
        content: notices.content,
        isPinned: notices.isPinned,
        publishedAt: notices.publishedAt,
        createdAt: notices.createdAt,
        authorName: users.username,
      })
      .from(notices)
      .innerJoin(users, eq(notices.authorId, users.id))
      .where(eq(notices.isPublished, true))
      .orderBy(orderFn(sortCol))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .all()
  },
}
