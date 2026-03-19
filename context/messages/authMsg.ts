// 인증 관련 문구 상수
export const AUTH_MSG = {
  BRAND_NAME: 'TaskFlow',
  BRAND_DESCRIPTION: '팀과 함께 더 스마트하게 일하세요',

  LOGIN_TITLE: '환영합니다',
  LOGIN_SUBTITLE: '계정에 로그인하세요',

  USERNAME_LABEL: '아이디',
  USERNAME_PLACEHOLDER: '아이디를 입력하세요',
  PASSWORD_LABEL: '비밀번호',
  PASSWORD_PLACEHOLDER: '비밀번호를 입력하세요',

  LOGIN_BUTTON: '로그인',
  ADD_ACCOUNT: '계정 추가',
  FIND_USERNAME: '아이디 찾기',
  FIND_PASSWORD: '비밀번호 찾기',

  LOGIN_LOADING: '로그인 중...',
  REQUIRED_FIELD: '필수 입력 항목입니다',
  LOGIN_FAILED: '로그인에 실패했습니다',
  LOGIN_FAILED_DESC: '아이디 또는 비밀번호를 확인해주세요',
  INVALID_CREDENTIALS: '아이디 또는 비밀번호가 올바르지 않습니다',
  SERVER_ERROR: '서버 오류가 발생했습니다',

  UNAUTHORIZED: '로그인이 필요합니다',
  LOGIN_REQUIRED_DESC: '이 페이지에 접근하려면 로그인이 필요합니다.',
  LOGIN_REQUIRED_BUTTON: '로그인하러 가기',
  TOKEN_EXPIRED: '로그인이 만료됐습니다. 다시 로그인해주세요',
  INVALID_TOKEN: '유효하지 않은 인증입니다',
  FORBIDDEN: '접근 권한이 없습니다',
  SESSION_EXPIRED_TITLE: '세션이 만료되었습니다',
  SESSION_EXPIRED_DESC: '인증이 만료되었습니다. 다시 로그인해 주세요.',

  COPYRIGHT: '© 2026 TaskFlow. All rights reserved.',
  BRAND_FEATURES: ['프로젝트 관리', '팀 협업', '실시간 진행 현황'] as const,

  // 계정 추가 (회원가입)
  REGISTER_TITLE: '계정 추가',
  REGISTER_SUBTITLE: '새 계정을 등록하세요',
  REGISTER_BUTTON: '등록',
  REGISTER_LOADING: '등록 중...',
  REGISTER_SUCCESS: '계정이 생성되었습니다',
  REGISTER_FAILED: '계정 생성에 실패했습니다',
  BACK_TO_LOGIN: '로그인으로 돌아가기',

  // 비밀번호 확인
  PASSWORD_CONFIRM_LABEL: '비밀번호 확인',
  PASSWORD_CONFIRM_PLACEHOLDER: '비밀번호를 다시 입력하세요',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다',
  PASSWORD_MATCH: '비밀번호가 일치합니다',

  // 이메일
  EMAIL_LABEL: '이메일',
  EMAIL_PLACEHOLDER: '이메일을 입력하세요',
  EMAIL_AVAILABLE: '사용 가능한 이메일입니다',
  EMAIL_TAKEN: '이미 사용 중인 이메일입니다',
  EMAIL_CHECK_REQUIRED: '이메일 중복 확인을 해주세요',
  EMAIL_CHECK_FAILED: '이메일 중복 확인에 실패했습니다',

  // 중복 확인
  CHECK_USERNAME: '중복 확인',
  CHECKING_USERNAME: '확인 중...',
  USERNAME_AVAILABLE: '사용 가능한 아이디입니다',
  USERNAME_TAKEN: '이미 사용 중인 아이디입니다',
  USERNAME_CHECK_REQUIRED: '아이디 중복 확인을 해주세요',
  USERNAME_CHECK_FAILED: '중복 확인에 실패했습니다',
}
