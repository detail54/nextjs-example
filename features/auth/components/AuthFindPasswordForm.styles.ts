// 비밀번호 찾기 폼 스타일 상수
export const findPasswordFormStyles = {
  wrapper: 'relative min-h-screen flex items-center justify-center bg-secondary-950 px-4 py-12',
  blobWrapper: 'absolute inset-0 overflow-hidden pointer-events-none',
  blob1:
    'absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-primary-700 opacity-20 blur-[120px]',
  blob2:
    'absolute -bottom-48 -right-32 w-[480px] h-[480px] rounded-full bg-primary-500 opacity-15 blur-[140px]',

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

  form: 'space-y-5',
  fieldWrapper: 'space-y-1.5',
  label: 'block text-sm font-semibold text-secondary-700',
  inputIconWrapper: 'relative',
  inputIcon: 'absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400 pointer-events-none',

  // 아이디 찾기에서 넘어온 경우 - 읽기전용 아이디 표시
  readonlyUsername:
    'w-full px-3 py-2 text-sm font-semibold text-secondary-900 bg-secondary-50 border border-secondary-200 rounded-lg',

  // 에러 메시지
  errorText: 'text-xs mt-1 text-red-500',

  // 비밀번호 일치 상태 메시지
  passwordMatchText: (match: boolean | null) => {
    if (match === null) return 'hidden'
    return match ? 'text-xs mt-1 text-green-600' : 'text-xs mt-1 text-red-500'
  },

  submitWrapper: 'pt-2',
  footerLinks: 'mt-6 flex items-center justify-center gap-1 flex-wrap',
}
