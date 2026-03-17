import {
  tableWrapperStyle,
  tableStyle,
  headerRowStyle,
  headerCellStyle,
  bodyRowStyle,
  bodyCellStyle,
  emptyCellStyle,
} from './DataList.styles'
import type { DataListProps } from './type'

// 재사용 가능한 데이터 리스트 테이블 컴포넌트
export default function DataList<T>({ columns, data, onRowClick, emptyMessage }: DataListProps<T>) {
  const isClickable = !!onRowClick

  return (
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
  )
}
