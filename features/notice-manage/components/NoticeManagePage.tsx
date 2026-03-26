'use client'

import { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useNoticeManageQuery, DEFAULT_NOTICE_MANAGE_PAGE_SIZE } from '../hooks/useNoticeManageQuery'
import { useNoticeDelete } from '../hooks/useNoticeDelete'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import DataList from '@/components/list/DataList'
import Pagination from '@/components/pagination/Pagination'
import BasicButton from '@/components/button/BasicButton'
import { noticeManagePageStyles } from './NoticeManagePage.styles'
import type { NoticeManageItem } from '../api/type'
import type { ListColumn } from '@/components/list/type'
import type { NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'
import { formatDate } from '../utils/noticeManageUtils'

// 페이지 사이즈 옵션
const PAGE_SIZE_OPTIONS = [10, 20, 30]

// 정렬 값 → sortBy/sortOrder 매핑
const SORT_MAP: Record<string, { sortBy: NoticeSortBy; sortOrder: NoticeSortOrder }> = {
  createdAt_desc: { sortBy: 'createdAt', sortOrder: 'desc' },
  createdAt_asc: { sortBy: 'createdAt', sortOrder: 'asc' },
  title_asc: { sortBy: 'title', sortOrder: 'asc' },
  title_desc: { sortBy: 'title', sortOrder: 'desc' },
}

// 공지사항 관리 목록 페이지 컴포넌트
export default function NoticeManagePage() {
  const router = useRouter()

  // 현재 페이지
  const [page, setPage] = useState(1)
  // 페이지당 항목 수
  const [pageSize, setPageSize] = useState(DEFAULT_NOTICE_MANAGE_PAGE_SIZE)
  // 정렬 선택 값
  const [sortValue, setSortValue] = useState('createdAt_desc')

  const { sortBy, sortOrder } = SORT_MAP[sortValue]
  const { data, isLoading } = useNoticeManageQuery(page, pageSize, sortBy, sortOrder)
  const { mutate: deleteNotice } = useNoticeDelete()
  const { openConfirmModal } = useConfirmModalStore()

  const notices = data?.data ?? []
  const totalPages = data?.pagination.totalPages ?? 1

  const handlePageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handlePageSizeChange = useCallback((value: number) => {
    setPageSize(value)
    setPage(1)
  }, [])

  const handleSortChange = useCallback((value: string) => {
    setSortValue(value)
    setPage(1)
  }, [])

  // 수정 페이지 이동
  const handleEdit = useCallback(
    (id: number) => {
      router.push(APP_PATHS.NOTICE_MANAGE.EDIT(id))
    },
    [router],
  )

  // 삭제 확인 모달 열기
  const handleDelete = useCallback(
    (id: number) => {
      openConfirmModal({
        type: 'confirm',
        title: NOTICE_MANAGE_MSG.DELETE_CONFIRM_TITLE,
        description: NOTICE_MANAGE_MSG.DELETE_CONFIRM_DESC,
        confirmLabel: NOTICE_MANAGE_MSG.DELETE_CONFIRM_LABEL,
        variant: 'danger',
        onConfirm: () => deleteNotice(id),
      })
    },
    [openConfirmModal, deleteNotice],
  )

  const columns = useMemo<ListColumn<NoticeManageItem>[]>(
    () => [
      {
        key: 'number',
        label: NOTICE_MANAGE_MSG.COLUMN_NUMBER,
        width: '64px',
        render: (_, index) => (page - 1) * pageSize + index + 1,
      },
      {
        key: 'title',
        label: NOTICE_MANAGE_MSG.COLUMN_TITLE,
        render: (row) => row.title,
      },
      {
        key: 'isPublished',
        label: NOTICE_MANAGE_MSG.COLUMN_PUBLISHED,
        width: '72px',
        render: (row) => (
          <span className={noticeManagePageStyles.publishedBadge({ published: row.isPublished })}>
            {row.isPublished ? NOTICE_MANAGE_MSG.PUBLISHED : NOTICE_MANAGE_MSG.UNPUBLISHED}
          </span>
        ),
      },
      {
        key: 'isPinned',
        label: NOTICE_MANAGE_MSG.COLUMN_PINNED,
        width: '56px',
        render: (row) => (
          <span className={noticeManagePageStyles.pinnedBadge({ pinned: row.isPinned })}>
            {row.isPinned ? NOTICE_MANAGE_MSG.PINNED : NOTICE_MANAGE_MSG.UNPINNED}
          </span>
        ),
      },
      {
        key: 'author',
        label: NOTICE_MANAGE_MSG.COLUMN_AUTHOR,
        width: '100px',
        render: (row) => row.authorName,
      },
      {
        key: 'createdAt',
        label: NOTICE_MANAGE_MSG.COLUMN_CREATED_AT,
        width: '100px',
        render: (row) => formatDate(row.createdAt),
      },
      {
        key: 'actions',
        label: NOTICE_MANAGE_MSG.COLUMN_ACTIONS,
        width: '100px',
        render: (row) => (
          <div className={noticeManagePageStyles.actionGroup}>
            <BasicButton
              variant='ghost'
              size='sm'
              onClick={() => handleEdit(row.id)}
            >
              {NOTICE_MANAGE_MSG.ACTION_EDIT}
            </BasicButton>
            <BasicButton
              variant='ghost'
              size='sm'
              onClick={() => handleDelete(row.id)}
            >
              {NOTICE_MANAGE_MSG.ACTION_DELETE}
            </BasicButton>
          </div>
        ),
      },
    ],
    [page, pageSize, handleEdit, handleDelete],
  )

  const pageSizeOptions = useMemo(
    () =>
      PAGE_SIZE_OPTIONS.map((n) => ({
        label: `${n}${NOTICE_MANAGE_MSG.PAGE_SIZE_SUFFIX}`,
        value: n,
      })),
    [],
  )

  const sortOptions = useMemo(
    () => [
      { label: NOTICE_MANAGE_MSG.SORT_CREATED_DESC, value: 'createdAt_desc' },
      { label: NOTICE_MANAGE_MSG.SORT_CREATED_ASC, value: 'createdAt_asc' },
      { label: NOTICE_MANAGE_MSG.SORT_TITLE_ASC, value: 'title_asc' },
      { label: NOTICE_MANAGE_MSG.SORT_TITLE_DESC, value: 'title_desc' },
    ],
    [],
  )

  return (
    <div className={noticeManagePageStyles.container}>
      <div className={noticeManagePageStyles.content}>
        <div className={noticeManagePageStyles.header}>
          <h1 className={noticeManagePageStyles.title}>{NOTICE_MANAGE_MSG.PAGE_TITLE}</h1>
          <BasicButton size='md' onClick={() => router.push(APP_PATHS.NOTICE_MANAGE.NEW)}>
            {NOTICE_MANAGE_MSG.CREATE_BUTTON}
          </BasicButton>
        </div>

        <DataList
          columns={columns}
          data={notices}
          emptyMessage={NOTICE_MANAGE_MSG.EMPTY}
          isLoading={isLoading}
          skeletonConfig={{
            rows: pageSize,
            columnWidths: ['64px', undefined, '72px', '56px', '100px', '100px', '100px'],
          }}
          sortSelector={{ value: sortValue, options: sortOptions, onChange: handleSortChange }}
          pageSizeSelector={{
            value: pageSize,
            options: pageSizeOptions,
            onChange: handlePageSizeChange,
          }}
        />

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
