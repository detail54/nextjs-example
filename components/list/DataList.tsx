import {
  listWrapperStyle,
  listToolbarStyle,
  tableWrapperStyle,
  tableStyle,
  headerRowStyle,
  headerCellStyle,
  bodyRowStyle,
  bodyCellStyle,
  emptyCellStyle,
} from './DataList.styles'
import SelectBox from '@/components/select/SelectBox'
import DataListSkeleton from './DataListSkeleton'
import type { DataListProps } from './type'

// 재사용 가능한 데이터 리스트 테이블 컴포넌트
export default function DataList<T>({
  columns,
  data,
  onRowClick,
  emptyMessage,
  pageSizeSelector,
  sortSelector,
  isLoading = false,
  skeletonConfig,
}: DataListProps<T>) {
  const isClickable = !!onRowClick
  const hasToolbar = !!(sortSelector || pageSizeSelector)

  // 로딩 중이면 스켈레톤 렌더링
  if (isLoading) {
    return (
      <DataListSkeleton
        columns={columns.length}
        rows={skeletonConfig?.rows}
        hasToolbar={hasToolbar}
        columnWidths={skeletonConfig?.columnWidths}
      />
    )
  }

  return (
    <div className={listWrapperStyle}>
      {/* 툴바 - 정렬(좌) / 페이지 사이즈(우), 하나라도 있을 경우 렌더링 */}
      {(sortSelector || pageSizeSelector) && (
        <div className={listToolbarStyle}>
          <div>
            {sortSelector && (
              <SelectBox
                value={sortSelector.value}
                options={sortSelector.options}
                onChange={(v) => sortSelector.onChange(v as string)}
              />
            )}
          </div>
          <div>
            {pageSizeSelector && (
              <SelectBox
                value={pageSizeSelector.value}
                options={pageSizeSelector.options}
                onChange={(v) => pageSizeSelector.onChange(v as number)}
              />
            )}
          </div>
        </div>
      )}

      <div className={tableWrapperStyle()}>
        <table className={tableStyle()}>
        <thead>
          <tr className={headerRowStyle()}>
            {columns.map((col) => (
              <th key={col.key} className={headerCellStyle()} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className={emptyCellStyle()} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className={bodyRowStyle({ clickable: isClickable })}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={bodyCellStyle()}>
                    {col.render(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}
