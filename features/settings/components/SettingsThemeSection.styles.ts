import { cva } from 'class-variance-authority'

export const settingsThemeSectionStyles = {
  // 카드 컨테이너
  card: cva('rounded-xl border border-secondary-700 bg-secondary-800 p-6')(),

  // 섹션 제목
  sectionTitle: cva('mb-4 text-base font-semibold text-white')(),

  // 설정 항목 행
  row: cva('flex items-center justify-between gap-4')(),

  // 항목 라벨
  label: cva('text-sm text-secondary-400')(),
}
