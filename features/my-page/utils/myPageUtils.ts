// 마이페이지 유틸

/** 날짜 문자열을 한국어 형식으로 변환 (예: 2026년 3월 26일) */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
