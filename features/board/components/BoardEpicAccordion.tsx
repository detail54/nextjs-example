'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BOARD_MSG } from '@/context/boardMsg'
import type { EpicWithTasks } from '../api/type'
import BoardKanban from './BoardKanban'
import { epicAccordionStyles } from './BoardEpicAccordion.styles'

type Props = {
  epic: EpicWithTasks
}

// 에픽 별 아코디언 컴포넌트
export default function BoardEpicAccordion({ epic }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={epicAccordionStyles.container}>
      {/* 아코디언 헤더 */}
      <button
        type='button'
        className={epicAccordionStyles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className={epicAccordionStyles.headerLeft}>
          <span className={epicAccordionStyles.epicTitle}>{epic.title}</span>
          <span className={epicAccordionStyles.taskCount}>
            {epic.tasks.length}
            {BOARD_MSG.TASKS_UNIT}
          </span>
        </div>
        <span className={epicAccordionStyles.chevronWrapper({ open: isOpen })}>
          <ChevronDown size={18} />
        </span>
      </button>

      {/* 칸반 보드 (펼쳐진 경우에만 렌더링) */}
      {isOpen && (
        <div className={epicAccordionStyles.content}>
          <BoardKanban epic={epic} />
        </div>
      )}
    </div>
  )
}
