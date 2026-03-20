// 사용자 관리 페이지 문구 상수
export const USER_MANAGE_MSG = {
  PAGE_TITLE: '사용자 관리',
  EMPTY: '등록된 사용자가 없습니다.',

  // 컬럼 라벨
  COLUMN_NUMBER: '번호',
  COLUMN_USERNAME: '아이디',
  COLUMN_EMAIL: '이메일',
  COLUMN_ROLE: '역할',

  // 역할 선택 옵션
  ROLE_USER: '일반',
  ROLE_ADMIN: '관리자',

  // 페이지 사이즈
  PAGE_SIZE_SUFFIX: '개씩 보기',

  // 정렬 옵션
  SORT_CREATED_DESC: '가입일 최신순',
  SORT_CREATED_ASC: '가입일 오래된순',
  SORT_USERNAME_ASC: '아이디 오름차순',
  SORT_USERNAME_DESC: '아이디 내림차순',
} as const
