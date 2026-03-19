// 계정 추가 폼 스타일 상수 (로그인 폼 스타일 기반)
export const registerFormStyles = {
  // 전체 페이지 - 다크 배경
  wrapper: 'relative min-h-screen flex items-center justify-center bg-secondary-950 px-4 py-12',

  // 배경 장식 블롭
  blobWrapper: 'absolute inset-0 overflow-hidden pointer-events-none',
  blob1:
    'absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-primary-700 opacity-20 blur-[120px]',
  blob2:
    'absolute -bottom-48 -right-32 w-[480px] h-[480px] rounded-full bg-primary-500 opacity-15 blur-[140px]',

  // 카드 - 두 컬럼 레이아웃
  card: 'relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2',

  // ── 좌측 브랜드 패널 ──
  brandPanel:
    'hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary-700 to-primary-950',
  brandTop: 'space-y-6',
  brandIconWrapper: 'w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center',
  brandName: 'text-4xl font-bold text-white tracking-tight',
  brandDesc: 'text-primary-200 text-base leading-relaxed max-w-xs',
  brandFeatures: 'space-y-3',
  brandFeatureItem: 'flex items-center gap-3 text-primary-200 text-sm',
  brandFeatureDot: 'w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0',
  brandBottom: 'pt-8 border-t border-white/10',
  brandCopyright: 'text-primary-400 text-xs',

  // ── 우측 폼 패널 ──
  formPanel: 'flex flex-col justify-center px-8 py-12 bg-white lg:px-12',
  formHeader: 'mb-8',
  formTitle: 'text-2xl font-bold text-secondary-900',
  formSubtitle: 'text-secondary-400 text-sm mt-1',

  // 폼 필드 영역
  form: 'space-y-5',
  fieldWrapper: 'space-y-1.5',
  label: 'block text-sm font-semibold text-secondary-700',
  inputIconWrapper: 'relative',
  inputIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none',

  // username 필드 - 중복 확인 버튼 포함
  usernameRow: 'flex gap-2',
  usernameInputWrapper: 'relative flex-1',

  // 중복 확인 상태 메시지
  statusText: (available: boolean | null) => {
    if (available === null) return 'hidden'
    return available ? 'text-xs mt-1 text-green-600' : 'text-xs mt-1 text-red-500'
  },

  // 비밀번호 일치 상태 메시지
  passwordMatchText: (match: boolean | null) => {
    if (match === null) return 'hidden'
    return match ? 'text-xs mt-1 text-green-600' : 'text-xs mt-1 text-red-500'
  },

  // 등록 버튼
  submitWrapper: 'pt-2',

  // 하단 링크 영역
  footerLinks: 'mt-6 flex items-center justify-center gap-1 flex-wrap',
}
