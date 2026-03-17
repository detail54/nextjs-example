// 보드 관련 React Query 키
export const boardKeys = {
  all: ['board'] as const,
  list: () => [...boardKeys.all, 'list'] as const,
}
