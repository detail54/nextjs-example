'use client'

import { useState, useCallback, useMemo } from 'react'
import { NOTICE_MSG } from '@/context/messages/noticeMsg'
import { useNoticeQuery, DEFAULT_NOTICE_PAGE_SIZE } from '../hooks/useNoticeQuery'
import DataList from '@/components/list/DataList'
import Pagination from '@/components/pagination/Pagination'
import NoticeModal from './NoticeModal'
import { noticePageStyles } from './NoticePage.styles'
import type { NoticeItem, NoticeSortBy, NoticeSortOrder } from '../api/type'
import type { ListColumn } from '@/components/list/type'

// 페이지 사이즈 옵션 목록
const PAGE_SIZE_OPTIONS = [10, 20, 30]

// 정렬 값 → sortBy/sortOrder 매핑
const SORT_MAP: Record<string, { sortBy: NoticeSortBy; sortOrder: NoticeSortOrder }> = {
  createdAt_desc: { sortBy: 'createdAt', sortOrder: 'desc' },
  createdAt_asc: { sortBy: 'createdAt', sortOrder: 'asc' },
  title_asc: { sortBy: 'title', sortOrder: 'asc' },
  title_desc: { sortBy: 'title', sortOrder: 'desc' },
}

// YYYY-MM-DD HH:MM:SS → YYYY.MM.DD 형식 변환
function formatDate(dateStr: string): string {
  return dateStr.slice(0, 10).replace(/-/g, '.')
}

// 공지사항 페이지 컴포넌트
export default function NoticePage() {
  // 현재 페이지
  const [page, setPage] = useState(1)
  // 페이지당 항목 수
  const [pageSize, setPageSize] = useState(DEFAULT_NOTICE_PAGE_SIZE)
  // 정렬 선택 값 (SORT_MAP 키)
  const [sortValue, setSortValue] = useState('createdAt_desc')
  // 모달에 표시할 선택된 공지사항
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null)

  const { sortBy, sortOrder } = SORT_MAP[sortValue]
  const { data, isLoading } = useNoticeQuery(page, pageSize, sortBy, sortOrder)
  const notices = data?.data ?? []
  const totalPages = data?.pagination.totalPages ?? 1

  // 페이지 변경 시 최상단 스크롤
  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // 페이지 사이즈 변경 시 1페이지로 초기화
  const handlePageSizeChange = useCallback((value: number) => {
    setPageSize(value)
    setPage(1)
  }, [])

  // 정렬 변경 시 1페이지로 초기화
  const handleSortChange = useCallback((value: string) => {
    setSortValue(value)
    setPage(1)
  }, [])

  const handleRowClick = useCallback((notice: NoticeItem) => {
    setSelectedNotice(notice)
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedNotice(null)
  }, [])

  // 페이지/사이즈 변경 시 번호 재계산
  const noticeColumns = useMemo<ListColumn<NoticeItem>[]>(
    () => [
      {
        key: 'number',
        label: NOTICE_MSG.COLUMN_NUMBER,
        width: '72px',
        render: (_, index) => (page - 1) * pageSize + index + 1,
      },
      {
        key: 'title',
        label: NOTICE_MSG.COLUMN_TITLE,
        render: (row) => row.title,
      },
      {
        key: 'createdAt',
        label: NOTICE_MSG.COLUMN_CREATED_AT,
        width: '120px',
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: 'author',
        label: NOTICE_MSG.COLUMN_AUTHOR,
        width: '120px',
        render: (row) => row.authorName,
      },
    ],
    [page, pageSize],
  )

  // 페이지 사이즈 셀렉터 옵션
  const pageSizeOptions = useMemo(
    () => PAGE_SIZE_OPTIONS.map((n) => ({ label: `${n}${NOTICE_MSG.PAGE_SIZE_SUFFIX}`, value: n })),
    [],
  )

  // 정렬 셀렉터 옵션
  const sortOptions = useMemo(
    () => [
      { label: NOTICE_MSG.SORT_CREATED_DESC, value: 'createdAt_desc' },
      { label: NOTICE_MSG.SORT_CREATED_ASC, value: 'createdAt_asc' },
      { label: NOTICE_MSG.SORT_TITLE_ASC, value: 'title_asc' },
      { label: NOTICE_MSG.SORT_TITLE_DESC, value: 'title_desc' },
    ],
    [],
  )

  return (
    <div className={noticePageStyles.container}>
      <div className={noticePageStyles.content}>
        <div className={noticePageStyles.header}>
          <h1 className={noticePageStyles.title}>{NOTICE_MSG.PAGE_TITLE}</h1>
        </div>

        <DataList
          columns={noticeColumns}
          data={notices}
          onRowClick={handleRowClick}
          emptyMessage={NOTICE_MSG.EMPTY}
          isLoading={isLoading}
          skeletonConfig={{
            rows: pageSize,
            columnWidths: ['72px', undefined, '120px', '120px'],
          }}
          sortSelector={{
            value: sortValue,
            options: sortOptions,
            onChange: handleSortChange,
          }}
          pageSizeSelector={{
            value: pageSize,
            options: pageSizeOptions,
            onChange: handlePageSizeChange,
          }}
        />

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      <NoticeModal notice={selectedNotice} onClose={handleModalClose} />
    </div>
  )
}
