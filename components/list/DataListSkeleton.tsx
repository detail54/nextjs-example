import {
  skeletonWrapper,
  skeletonToolbar,
  skeletonSelect,
  skeletonTableWrapper,
  skeletonHeaderRow,
  skeletonBodyRow,
  skeletonCell,
} from './DataListSkeleton.styles'

type Props = {
  // 컬럼 수
  columns: number
  // 표시할 행 수
  rows?: number
  // 툴바 (정렬/페이지사이즈 셀렉터) 스켈레톤 표시 여부
  hasToolbar?: boolean
  // 각 컬럼 너비 (미지정 시 flex-1로 채움)
  columnWidths?: (string | undefined)[]
}

// DataList 로딩 스켈레톤
export default function DataListSkeleton({
  columns,
  rows = 5,
  hasToolbar = false,
  columnWidths,
}: Props) {
  // 컬럼 인덱스에 따른 셀 스타일 반환
  const getCellProps = (index: number) => {
    const width = columnWidths?.[index]
    return {
      className: skeletonCell({ auto: !width }),
      style: width ? { width } : undefined,
    }
  }

  return (
    <div className={skeletonWrapper}>
      {/* 툴바 스켈레톤 */}
      {hasToolbar && (
        <div className={skeletonToolbar}>
          <div className={skeletonSelect} />
          <div className={skeletonSelect} />
        </div>
      )}

      <div className={skeletonTableWrapper}>
        {/* 헤더 행 */}
        <div className={skeletonHeaderRow}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} {...getCellProps(i)} />
          ))}
        </div>

        {/* 바디 행 */}
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className={skeletonBodyRow}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div key={colIdx} {...getCellProps(colIdx)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
