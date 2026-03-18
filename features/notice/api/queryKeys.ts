// 공지사항 관련 React Query 키
export const noticeKeys = {
  all: ['notice'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, sortBy: string, sortOrder: string) =>
    [...noticeKeys.lists(), { page, pageSize, sortBy, sortOrder }] as const,
}
