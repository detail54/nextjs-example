// 에픽/태스크 관련 React Query 키
export const epicKeys = {
  all: ['epic'] as const,
  list: () => [...epicKeys.all, 'list'] as const,
}

// 사용자 관련 React Query 키
export const userKeys = {
  all: ['user'] as const,
  allUsers: () => [...userKeys.all, 'all'] as const,
}
