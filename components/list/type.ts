import type { ReactNode } from 'react'
import type { SelectOption } from '@/components/select/SelectBox'

/** 리스트 컬럼 정의 */
export type ListColumn<T> = {
  key: string
  label: string
  width?: string
  render: (row: T, index: number) => ReactNode
}

/** 페이지 사이즈 셀렉터 props */
export type PageSizeSelectorProps = {
  /** 현재 페이지당 항목 수 */
  value: number
  /** 선택 옵션 목록 */
  options: SelectOption[]
  /** 변경 콜백 */
  onChange: (value: number) => void
}

/** DataList 컴포넌트 props */
export type DataListProps<T> = {
  columns: ListColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  emptyMessage?: string
  /** 페이지 사이즈 셀렉터 (있을 경우 리스트 상단에 렌더링) */
  pageSizeSelector?: PageSizeSelectorProps
}
