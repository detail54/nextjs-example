'use client'

import { useState, useCallback, useMemo } from 'react'
import { NOTICE_MSG } from '@/context/messages/noticeMsg'
import { useNoticeQuery, DEFAULT_NOTICE_PAGE_SIZE } from '../hooks/useNoticeQuery'
import DataList from '@/components/list/DataList'
import Pagination from '@/components/pagination/Pagination'
import NoticeModal from './NoticeModal'
import { noticePageStyles } from './NoticePage.styles'
import type { NoticeItem } from '../api/type'
import type { ListColumn } from '@/components/list/type'

// 페이지 사이즈 옵션 목록
const PAGE_SIZE_OPTIONS = [10, 20, 30]

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
  // 모달에 표시할 선택된 공지사항
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null)

  const { data } = useNoticeQuery(page, pageSize)
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
