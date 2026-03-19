import { noticeRepository } from './notice.repository'
import { type GetNoticesParams, type GetNoticesResult } from './type'

// ─── 공지사항 서비스 ──────────────────────────────────────────────

export const noticeService = {
  /** 게시된 공지사항 페이지 목록 조회 */
  getPublished({ page, pageSize, sortBy, sortOrder }: GetNoticesParams): GetNoticesResult {
    const total = noticeRepository.countPublished()
    const totalPages = Math.ceil(total / pageSize)
    const data = noticeRepository.getPublished(page, pageSize, sortBy, sortOrder)
    return { data, total, totalPages }
  },
}
