/** Pagination 컴포넌트 props */
export type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
