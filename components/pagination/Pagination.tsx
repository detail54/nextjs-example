import { ChevronLeft, ChevronRight } from 'lucide-react'
import { paginationContainerStyle, pageButtonStyle, ellipsisStyle } from './Pagination.styles'
import type { PaginationProps } from './type'
import { COMMON_MSG } from '@/context/messages/commonMsg'

// 표시할 페이지 번호 목록 계산 (ellipsis는 null로 표현)
function getPageNumbers(current: number, total: number): (number | null)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | null)[] = [1]

  if (current > 3) {
    pages.push(null)
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push(null)
  }

  pages.push(total)

  return pages
}

// 페이지네이션 컴포넌트
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  return (
    <div className={paginationContainerStyle()}>
      {/* 이전 버튼 */}
      <button
        className={pageButtonStyle()}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={COMMON_MSG.PAGINATION_PREV}
      >
        <ChevronLeft size={16} />
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((page, index) =>
        page === null ? (
          <span key={`ellipsis-${index}`} className={ellipsisStyle()}>
            …
          </span>
        ) : (
          <button
            key={page}
            className={pageButtonStyle({ active: page === currentPage })}
            onClick={() => onPageChange(page)}
            aria-label={`${page}${COMMON_MSG.PAGINATION_PAGE_SUFFIX}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ),
      )}

      {/* 다음 버튼 */}
      <button
        className={pageButtonStyle()}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={COMMON_MSG.PAGINATION_NEXT}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
