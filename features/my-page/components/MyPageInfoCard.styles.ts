import { cva } from 'class-variance-authority'

export const myPageInfoCardStyles = {
  // 카드 컨테이너
  card: cva('rounded-xl border border-secondary-700 bg-secondary-800 p-6')(),

  // 섹션 제목
  sectionTitle: cva('mb-4 text-base font-semibold text-white')(),

  // 정보 행 목록
  list: cva('flex flex-col gap-3')(),

  // 정보 행 (라벨 + 값)
  row: cva('flex items-center gap-4')(),

  // 라벨
  label: cva('w-20 shrink-0 text-sm text-secondary-400')(),

  // 값 + 변경하기 버튼을 담는 행
  valueRow: cva('flex flex-1 items-center justify-between gap-2')(),

  // 값
  value: cva('text-sm font-medium text-secondary-100')(),

  // 역할 뱃지
  roleBadge: cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    {
      variants: {
        role: {
          ADMIN: 'bg-primary-900 text-primary-300',
          USER: 'bg-secondary-700 text-secondary-300',
        },
      },
      defaultVariants: { role: 'USER' },
    },
  ),

  // 인라인 편집 영역 (라벨 너비만큼 들여쓰기)
  inlineEdit: cva('ml-24 flex flex-col gap-3 pt-2')(),
}
