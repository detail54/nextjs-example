// root 홈 페이지 스타일 상수
export const homeStyles = {
  // 전체 배경 - 로그인 페이지와 동일한 다크 테마
  wrapper: 'relative min-h-screen flex flex-col items-center justify-center bg-secondary-950 px-4',

  // 배경 장식 블롭
  blobWrapper: 'absolute inset-0 overflow-hidden pointer-events-none',
  blob1: 'absolute -top-48 -left-32 w-[560px] h-[560px] rounded-full bg-primary-700 opacity-20 blur-[120px]',
  blob2: 'absolute -bottom-48 -right-32 w-[480px] h-[480px] rounded-full bg-primary-500 opacity-15 blur-[140px]',

  // 콘텐츠 영역
  content: 'relative z-10 flex flex-col items-center text-center max-w-lg gap-8',

  // 브랜드 아이콘
  iconWrapper: 'w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-900/50',

  // 텍스트
  title: 'text-5xl font-bold text-white tracking-tight',
  subtitle: 'text-secondary-400 text-lg leading-relaxed',

  // 버튼 영역
  actions: 'flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto',
  loginButton: 'w-full sm:w-auto',
}
