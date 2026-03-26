// 공지사항 관리 유틸

/** YYYY-MM-DD HH:MM:SS → YYYY.MM.DD 형식 변환 */
export function formatDate(dateStr: string): string {
  return dateStr.slice(0, 10).replace(/-/g, '.')
}
