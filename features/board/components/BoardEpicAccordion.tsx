'use client'

import { useState } from 'react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useEpicPanelStore } from '@/stores/useEpicPanelStore'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useEpicDelete } from '../hooks/useEpic'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { EpicWithTasks } from '../api/type'
import BoardKanban from './BoardKanban'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import Icon from '@/components/icon/Icon'
import { epicAccordionStyles } from './BoardEpicAccordion.styles'

type Props = {
  epic: EpicWithTasks
}

// 에픽 별 아코디언 컴포넌트
export default function BoardEpicAccordion({ epic }: Props) {
  // 아코디언 펼침 여부
  const [isOpen, setIsOpen] = useState(false)

  const { isAdmin } = useAuth()
  const { openEpicEdit } = useEpicPanelStore()
  const { openConfirmModal } = useConfirmModalStore()
  const { mutate: deleteEpic } = useEpicDelete()

  const handleEdit = () => openEpicEdit(epic)

  const handleDeleteClick = () => {
    openConfirmModal({
      type: 'confirm',
      title: BOARD_MSG.EPIC_DELETE_CONFIRM_TITLE,
      description: BOARD_MSG.EPIC_DELETE_CONFIRM_DESC,
      confirmLabel: BOARD_MSG.EPIC_DELETE_CONFIRM,
      variant: 'danger',
      onConfirm: () => deleteEpic(epic.id),
    })
  }

  const dropdownItems = [
    { label: BOARD_MSG.EPIC_EDIT, onClick: handleEdit },
    { label: BOARD_MSG.EPIC_DELETE, onClick: handleDeleteClick, danger: true },
  ]

  return (
    <div className={epicAccordionStyles.container}>
      {/* 아코디언 헤더 */}
      <div className={epicAccordionStyles.header({ open: isOpen })}>
        {/* 토글 버튼 (제목 + 카운트 + 화살표) */}
        <button
          type='button'
          className={epicAccordionStyles.toggleButton}
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

        {/* ⋯ 더보기 버튼 (관리자만 표시) */}
        {isAdmin && (
          <div className={epicAccordionStyles.moreButtonWrapper}>
            <DropdownMenu
              trigger={<Icon icon={MoreHorizontal} size='sm' />}
              triggerClassName={epicAccordionStyles.moreButton}
              items={dropdownItems}
            />
          </div>
        )}
      </div>

      {/* 칸반 보드 (펼쳐진 경우에만 렌더링) */}
      {isOpen && (
        <div className={epicAccordionStyles.content}>
          <BoardKanban epic={epic} />
        </div>
      )}

    </div>
  )
}
