import { db } from '@/server/core/db/db'
import { notices, users } from '@/server/core/db/schema'
import { eq, desc, asc, count } from 'drizzle-orm'
import type {
  NoticeManageItem,
  NoticeManageDetail,
  CreateNoticeParams,
  UpdateNoticeParams,
} from './type'

export const noticeRepository = {
  // ─── 공개 공지 조회 ───────────────────────────────────────────

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
      .orderBy(desc(notices.isPinned), orderFn(sortCol))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .all()
  },

  // ─── 관리자 CRUD ──────────────────────────────────────────────

  /** 전체 공지사항 건수 (게시 여부 무관) */
  countAll(): number {
    const result = db.select({ total: count() }).from(notices).get()
    return result?.total ?? 0
  },

  /** 전체 공지사항 목록 조회 (관리자용) */
  getAll(
    page: number,
    pageSize: number,
    sortBy: 'createdAt' | 'title' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
  ): NoticeManageItem[] {
    const sortCol = sortBy === 'title' ? notices.title : notices.createdAt
    const orderFn = sortOrder === 'asc' ? asc : desc

    return db
      .select({
        id: notices.id,
        title: notices.title,
        authorName: users.username,
        isPinned: notices.isPinned,
        isPublished: notices.isPublished,
        createdAt: notices.createdAt,
        updatedAt: notices.updatedAt,
      })
      .from(notices)
      .innerJoin(users, eq(notices.authorId, users.id))
      .orderBy(desc(notices.isPinned), orderFn(sortCol))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .all() as NoticeManageItem[]
  },

  /** 단건 조회 (관리자용, content 포함) */
  findById(id: number): NoticeManageDetail | undefined {
    return db
      .select({
        id: notices.id,
        title: notices.title,
        content: notices.content,
        authorName: users.username,
        isPinned: notices.isPinned,
        isPublished: notices.isPublished,
        createdAt: notices.createdAt,
        updatedAt: notices.updatedAt,
      })
      .from(notices)
      .innerJoin(users, eq(notices.authorId, users.id))
      .where(eq(notices.id, id))
      .get() as NoticeManageDetail | undefined
  },

  /** 공지사항 생성 */
  create({ authorId, title, content, isPinned, isPublished }: CreateNoticeParams): void {
    db.insert(notices).values({ authorId, title, content, isPinned, isPublished }).run()
  },

  /** 공지사항 수정 */
  update(id: number, { title, content, isPinned, isPublished }: UpdateNoticeParams): void {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    db.update(notices)
      .set({ title, content, isPinned, isPublished, updatedAt: now })
      .where(eq(notices.id, id))
      .run()
  },

  /** 공지사항 삭제 */
  delete(id: number): void {
    db.delete(notices).where(eq(notices.id, id)).run()
  },
}
