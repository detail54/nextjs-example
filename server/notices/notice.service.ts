import { noticeRepository } from './notice.repository'
import { NOTICE_MSG } from './noticeMsg'
import type {
  GetNoticesParams,
  GetNoticesResult,
  GetNoticeManageResult,
  NoticeManageDetail,
  CreateNoticeParams,
  UpdateNoticeParams,
} from './type'
import type { NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'
import type { ServiceResult, ServiceDataResult } from '@/server/core/type'

// ─── 공지사항 서비스 ──────────────────────────────────────────────

export const noticeService = {
  /** 게시된 공지사항 페이지 목록 조회 */
  getPublished({ page, pageSize, sortBy, sortOrder }: GetNoticesParams): GetNoticesResult {
    const total = noticeRepository.countPublished()
    const totalPages = Math.ceil(total / pageSize)
    const data = noticeRepository.getPublished(page, pageSize, sortBy, sortOrder)
    return { data, total, totalPages }
  },

  /** 전체 공지사항 목록 조회 (관리자) */
  getAll(
    page: number,
    pageSize: number,
    sortBy: NoticeSortBy,
    sortOrder: NoticeSortOrder,
  ): GetNoticeManageResult {
    const total = noticeRepository.countAll()
    const totalPages = Math.ceil(total / pageSize)
    const data = noticeRepository.getAll(page, pageSize, sortBy, sortOrder)
    return { data, total, totalPages }
  },

  /** 단건 조회 (관리자) */
  getById(id: number): ServiceDataResult<{ notice: NoticeManageDetail }> {
    const notice = noticeRepository.findById(id)
    if (!notice) return { ok: false, message: NOTICE_MSG.NOT_FOUND, status: 404 }
    return { ok: true, notice }
  },

  /** 공지사항 생성 */
  create(params: CreateNoticeParams): ServiceResult {
    noticeRepository.create(params)
    return { ok: true }
  },

  /** 공지사항 수정 */
  update(id: number, params: UpdateNoticeParams): ServiceResult {
    const existing = noticeRepository.findById(id)
    if (!existing) return { ok: false, message: NOTICE_MSG.NOT_FOUND, status: 404 }
    noticeRepository.update(id, params)
    return { ok: true }
  },

  /** 공지사항 삭제 */
  delete(id: number): ServiceResult {
    const existing = noticeRepository.findById(id)
    if (!existing) return { ok: false, message: NOTICE_MSG.NOT_FOUND, status: 404 }
    noticeRepository.delete(id)
    return { ok: true }
  },
}
