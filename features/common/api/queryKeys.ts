// 에픽/태스크 관련 React Query 키
export const epicKeys = {
  all: ['epic'] as const,
  list: () => [...epicKeys.all, 'list'] as const,
}
