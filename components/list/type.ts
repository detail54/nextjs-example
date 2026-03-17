import type { ReactNode } from 'react'

/** 리스트 컬럼 정의 */
export type ListColumn<T> = {
  key: string
  label: string
  width?: string
  render: (row: T, index: number) => ReactNode
}

/** DataList 컴포넌트 props */
export type DataListProps<T> = {
  columns: ListColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  emptyMessage?: string
}
