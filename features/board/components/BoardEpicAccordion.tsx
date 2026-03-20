'use client'

import { useState } from 'react'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { COMMON_MSG } from '@/context/messages/commonMsg'
import { useEpicPanelStore } from '@/stores/useEpicPanelStore'
import { useConfirmModalStore } from '@/stores/useConfirmModalStore'
import { useEpicDelete } from '../hooks/useEpic'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { EpicWithTasks } from '@/features/common/api/type'
import BoardKanban from './BoardKanban'
import DropdownMenu from '@/components/dropdown/DropdownMenu'
import Icon from '@/components/icon/Icon'
import { epicAccordionStyles } from './BoardEpicAccordion.styles'
import { getAvatarBgColor, getInitials } from './AssigneeSelector.styles'

// 헤더에 표시할 최대 담당자 아바타 수
const MAX_EPIC_ASSIGNEES = 4

type Props = {
  epic: EpicWithTasks
}

// 에픽 별 아코디언 컴포넌트
export default function BoardEpicAccordion({ epic }: Props) {
  // 아코디언 펼침 여부 (기본값: 펼침)
  const [isOpen, setIsOpen] = useState(true)

  const { isAdmin } = useAuth()
  const { openEpicEdit } = useEpicPanelStore()
  const { openConfirmModal } = useConfirmModalStore()
  const { mutate: deleteEpic } = useEpicDelete()

  const handleEdit = () => openEpicEdit(epic)

  const handleDeleteClick = () => {
    openConfirmModal({
      type: 'confirm',
      title: COMMON_MSG.EPIC_DELETE_CONFIRM_TITLE,
      description: COMMON_MSG.EPIC_DELETE_CONFIRM_DESC,
      confirmLabel: COMMON_MSG.EPIC_DELETE_CONFIRM,
      variant: 'danger',
      onConfirm: () => deleteEpic(epic.id),
    })
  }

  const dropdownItems = [
    { label: BOARD_MSG.EPIC_EDIT, onClick: handleEdit },
    { label: BOARD_MSG.EPIC_DELETE, onClick: handleDeleteClick, danger: true },
  ]

  // 담당자 표시용 (최대 MAX_EPIC_ASSIGNEES + 초과 수)
  const visibleAssignees = epic.assignees.slice(0, MAX_EPIC_ASSIGNEES)
  const overflowCount = epic.assignees.length - MAX_EPIC_ASSIGNEES

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
            {/* 에픽 담당자 아바타 (에픽명 왼쪽, 겹침) */}
            {epic.assignees.length > 0 && (
              <div className={epicAccordionStyles.assigneeRow}>
                {visibleAssignees.map((assignee, i) => (
                  <div
                    key={assignee.id}
                    className={`${epicAccordionStyles.assigneeAvatar} ${getAvatarBgColor(assignee.id)}${i > 0 ? ' -ml-2' : ''}`}
                    title={assignee.username}
                  >
                    {getInitials(assignee.username)}
                  </div>
                ))}
                {overflowCount > 0 && (
                  <div className={epicAccordionStyles.assigneeOverflow}>+{overflowCount}</div>
                )}
              </div>
            )}

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
