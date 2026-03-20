'use client'

import { useState, useCallback, useMemo } from 'react'
import { USER_MANAGE_MSG } from '@/context/messages/userManageMsg'
import { useUserQuery, DEFAULT_USER_PAGE_SIZE } from '../hooks/useUserQuery'
import { useUserRoleUpdate } from '../hooks/useUserRoleUpdate'
import DataList from '@/components/list/DataList'
import Pagination from '@/components/pagination/Pagination'
import SelectBox from '@/components/select/SelectBox'
import { userManagePageStyles } from './UserManagePage.styles'
import type { UserItem, UserSortBy, UserSortOrder } from '../api/type'
import type { ListColumn } from '@/components/list/type'
import type { UserRole } from '@/server/core/db/type'
import { USER_ROLE } from '@/context/constants'

// 페이지 사이즈 옵션 목록
const PAGE_SIZE_OPTIONS = [10, 20, 30]

// 역할 선택 옵션
const ROLE_OPTIONS = [
  { label: USER_MANAGE_MSG.ROLE_USER, value: USER_ROLE.USER },
  { label: USER_MANAGE_MSG.ROLE_ADMIN, value: USER_ROLE.ADMIN },
]

// 정렬 값 → sortBy/sortOrder 매핑
const SORT_MAP: Record<string, { sortBy: UserSortBy; sortOrder: UserSortOrder }> = {
  createdAt_desc: { sortBy: 'createdAt', sortOrder: 'desc' },
  createdAt_asc: { sortBy: 'createdAt', sortOrder: 'asc' },
  username_asc: { sortBy: 'username', sortOrder: 'asc' },
  username_desc: { sortBy: 'username', sortOrder: 'desc' },
}

// 사용자 관리 페이지 컴포넌트
export default function UserManagePage() {
  // 현재 페이지
  const [page, setPage] = useState(1)
  // 페이지당 항목 수
  const [pageSize, setPageSize] = useState(DEFAULT_USER_PAGE_SIZE)
  // 정렬 선택 값 (SORT_MAP 키)
  const [sortValue, setSortValue] = useState('createdAt_desc')

  const { sortBy, sortOrder } = SORT_MAP[sortValue]
  const { data, isLoading } = useUserQuery(page, pageSize, sortBy, sortOrder)
  const { mutate: updateRole } = useUserRoleUpdate()

  const users = data?.data ?? []
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

  // 역할 변경 핸들러
  const handleRoleChange = useCallback(
    (userId: number, role: string) => {
      updateRole({ id: userId, role: role as UserRole })
    },
    [updateRole],
  )

  // 페이지/사이즈 변경 시 번호 재계산
  const columns = useMemo<ListColumn<UserItem>[]>(
    () => [
      {
        key: 'number',
        label: USER_MANAGE_MSG.COLUMN_NUMBER,
        width: '72px',
        render: (_, index) => (page - 1) * pageSize + index + 1,
      },
      {
        key: 'username',
        label: USER_MANAGE_MSG.COLUMN_USERNAME,
        render: (row) => row.username,
      },
      {
        key: 'email',
        label: USER_MANAGE_MSG.COLUMN_EMAIL,
        render: (row) => row.email,
      },
      {
        key: 'role',
        label: USER_MANAGE_MSG.COLUMN_ROLE,
        width: '140px',
        render: (row) => (
          <SelectBox
            value={row.role}
            options={ROLE_OPTIONS}
            onChange={(value) => handleRoleChange(row.id, value as string)}
          />
        ),
      },
    ],
    [page, pageSize, handleRoleChange],
  )

  // 페이지 사이즈 셀렉터 옵션
  const pageSizeOptions = useMemo(
    () =>
      PAGE_SIZE_OPTIONS.map((n) => ({ label: `${n}${USER_MANAGE_MSG.PAGE_SIZE_SUFFIX}`, value: n })),
    [],
  )

  // 정렬 셀렉터 옵션
  const sortOptions = useMemo(
    () => [
      { label: USER_MANAGE_MSG.SORT_CREATED_DESC, value: 'createdAt_desc' },
      { label: USER_MANAGE_MSG.SORT_CREATED_ASC, value: 'createdAt_asc' },
      { label: USER_MANAGE_MSG.SORT_USERNAME_ASC, value: 'username_asc' },
      { label: USER_MANAGE_MSG.SORT_USERNAME_DESC, value: 'username_desc' },
    ],
    [],
  )

  return (
    <div className={userManagePageStyles.container}>
      <div className={userManagePageStyles.content}>
        <div className={userManagePageStyles.header}>
          <h1 className={userManagePageStyles.title}>{USER_MANAGE_MSG.PAGE_TITLE}</h1>
        </div>

        <DataList
          columns={columns}
          data={users}
          emptyMessage={USER_MANAGE_MSG.EMPTY}
          isLoading={isLoading}
          skeletonConfig={{
            rows: pageSize,
            columnWidths: ['72px', undefined, undefined, '140px'],
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
    </div>
  )
}
