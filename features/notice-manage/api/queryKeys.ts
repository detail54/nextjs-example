// 공지사항 관리 Query Key Factory
export const noticeManageKeys = {
  all: ['noticeManage'] as const,
  lists: () => [...noticeManageKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, sortBy: string, sortOrder: string) =>
    [...noticeManageKeys.lists(), { page, pageSize, sortBy, sortOrder }] as const,
  detail: (id: number) => [...noticeManageKeys.all, 'detail', id] as const,
}
