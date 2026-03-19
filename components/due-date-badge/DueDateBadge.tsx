import { AlertCircle, TriangleAlert, Clock, Calendar } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { dueDateBadgeStyles } from './DueDateBadge.styles'

// 마감일 긴급도 레벨
type UrgencyLevel = 'overdue' | 'urgent' | 'warning' | 'normal'

// 오늘 기준 남은 일수로 긴급도 계산
function getUrgencyLevel(dueDate: string): UrgencyLevel {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return 'overdue'
  if (diffDays <= 3) return 'urgent'
  if (diffDays <= 7) return 'warning'
  return 'normal'
}

// 긴급도별 아이콘 매핑
const URGENCY_ICON: Record<UrgencyLevel, React.ElementType> = {
  overdue: AlertCircle,
  urgent: TriangleAlert,
  warning: Clock,
  normal: Calendar,
}

// 긴급도별 툴팁 매핑
const URGENCY_TOOLTIP: Record<UrgencyLevel, string> = {
  overdue: BOARD_MSG.DUE_DATE_OVERDUE_TOOLTIP,
  urgent: BOARD_MSG.DUE_DATE_URGENT_TOOLTIP,
  warning: BOARD_MSG.DUE_DATE_WARNING_TOOLTIP,
  normal: '',
}

interface DueDateBadgeProps {
  dueDate: string | null
  // 완료 상태이면 경고 없이 normal로 표시
  isDone?: boolean
}

// 마감일 긴급도 배지 - 마감 임박 시 아이콘 + 색상으로 강조
export default function DueDateBadge({ dueDate, isDone = false }: DueDateBadgeProps) {
  if (!dueDate) return null

  const level = isDone ? 'normal' : getUrgencyLevel(dueDate)
  const UrgencyIcon = URGENCY_ICON[level]
  const tooltip = URGENCY_TOOLTIP[level]

  return (
    <div className={dueDateBadgeStyles.wrapper()} title={tooltip || undefined}>
      <UrgencyIcon className={dueDateBadgeStyles.icon({ level })} />
      <span className={dueDateBadgeStyles.text({ level })}>{dueDate}</span>
    </div>
  )
}
