// Query Key Factory 패턴 - 계층 구조로 키 관리
export const authKeys = {
  // 최상위 키 - auth 관련 전체 무효화 시 사용
  all: ['auth'] as const,

  // 현재 세션 정보
  session: () => [...authKeys.all, 'session'] as const,

  // 특정 유저 정보
  user: (userId: number) => [...authKeys.all, 'user', userId] as const,
}
