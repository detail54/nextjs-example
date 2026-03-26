// 마이페이지 Query Key Factory
export const myPageKeys = {
  // 최상위 키
  all: ['myPage'] as const,

  // 내 프로필
  profile: () => [...myPageKeys.all, 'profile'] as const,
}
