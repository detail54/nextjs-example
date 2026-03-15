// 홈 랜딩 페이지 스타일 상수
export const homeLandingStyles = {
  wrapper:
    'relative min-h-screen flex flex-col items-center justify-center bg-secondary-950 px-4',

  blobWrapper: 'absolute inset-0 overflow-hidden pointer-events-none',
  blob1:
    'absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-primary-700 opacity-20 blur-[120px]',
  blob2:
    'absolute -bottom-48 -right-32 w-[480px] h-[480px] rounded-full bg-primary-500 opacity-15 blur-[140px]',

  content: 'relative z-10 flex flex-col items-center text-center max-w-lg gap-8',

  iconWrapper:
    'flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 shadow-lg shadow-primary-900/50',

  title: 'text-5xl font-bold tracking-tight text-white',
  subtitle: 'text-lg leading-relaxed text-secondary-400',

  actions: 'flex flex-col items-center gap-3 w-full sm:flex-row sm:w-auto',
  loginButton: 'w-full sm:w-auto',
}
