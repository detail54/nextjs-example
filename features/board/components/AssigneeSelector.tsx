'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { UserPlus, Check, UserCheck } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useSession } from '@/features/auth/hooks/useSession'
import type { Assignee } from '@/features/common/api/type'
import {
  assigneeSelectorStyles,
  getAvatarBgColor,
  getInitials,
} from './AssigneeSelector.styles'

interface AssigneeSelectorProps {
  // 현재 선택된 담당자 목록
  assignees: Assignee[]
  // 선택 가능한 전체 사용자 목록
  allUsers: Assignee[]
  // 담당자 변경 콜백
  onChange: (assignees: Assignee[]) => void
  // 읽기 전용 여부
  disabled?: boolean
  // 카드 내 겹침 레이아웃 여부
  compact?: boolean
}

// 에픽/태스크 담당자 선택 컴포넌트
export default function AssigneeSelector({
  assignees,
  allUsers,
  onChange,
  disabled = false,
  compact = false,
}: AssigneeSelectorProps) {
  // 드롭다운 열림 여부
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 현재 로그인 유저 (나에게 할당 기능에 사용)
  const { data: me } = useSession()

  // 외부 클릭 시 드롭다운 닫기
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, handleClickOutside])

  // 특정 사용자가 담당자로 지정되어 있는지 확인
  const isAssigned = (userId: number) => assignees.some((a) => a.id === userId)

  // 담당자 토글 (추가/제거)
  const toggleUser = (user: Assignee) => {
    if (isAssigned(user.id)) {
      onChange(assignees.filter((a) => a.id !== user.id))
    } else {
      onChange([...assignees, user])
    }
  }

  const toggle = () => setIsOpen((prev) => !prev)

  // ── 컴팩트 모드 렌더링 ───────────────────────────────
  if (compact) {
    const hasMany = assignees.length >= 2

    return (
      <div ref={containerRef} className={assigneeSelectorStyles.wrapper}>
        <div className={assigneeSelectorStyles.compactAvatarRow}>
          {/* 담당자 아바타 (겹침: 첫 번째 제외 -ml-1.5) */}
          {assignees.map((assignee, i) => (
            <div
              key={assignee.id}
              className={`${assigneeSelectorStyles.compactAvatar} ${getAvatarBgColor(assignee.id)}${i > 0 ? ' -ml-1.5' : ''}`}
              title={assignee.username}
            >
              {getInitials(assignee.username)}
            </div>
          ))}

          {/* 2명 이상이면 ⋯ 버튼, 아니면 + 버튼 */}
          {!disabled &&
            (hasMany ? (
              <button
                type='button'
                onClick={toggle}
                className={assigneeSelectorStyles.compactMoreButton}
                title={BOARD_MSG.ASSIGNEE_SELECT_TITLE}
                aria-expanded={isOpen}
              >
                ···
              </button>
            ) : (
              <button
                type='button'
                onClick={toggle}
                className={`${assigneeSelectorStyles.compactAddButton}${assignees.length > 0 ? ' -ml-1.5' : ''}`}
                title={BOARD_MSG.ASSIGNEE_SELECT_TITLE}
                aria-expanded={isOpen}
              >
                <UserPlus size={11} />
              </button>
            ))}
        </div>

        {/* 드롭다운 */}
        {isOpen && (
          <DropdownPanel
            allUsers={allUsers}
            isAssigned={isAssigned}
            onToggle={toggleUser}
            me={me ?? null}
          />
        )}
      </div>
    )
  }

  // ── 일반 모드 렌더링 ─────────────────────────────────
  return (
    <div ref={containerRef} className={assigneeSelectorStyles.wrapper}>
      {/* 현재 담당자 아바타 + 추가 버튼 */}
      <div className={assigneeSelectorStyles.avatarRow}>
        {assignees.map((assignee) => (
          <div
            key={assignee.id}
            className={`${assigneeSelectorStyles.avatar} ${getAvatarBgColor(assignee.id)}`}
            title={assignee.username}
          >
            {getInitials(assignee.username)}
          </div>
        ))}

        {!disabled && (
          <button
            type='button'
            onClick={toggle}
            className={assigneeSelectorStyles.addButton}
            title={BOARD_MSG.ASSIGNEE_SELECT_TITLE}
            aria-expanded={isOpen}
          >
            <UserPlus size={13} />
          </button>
        )}

        {assignees.length === 0 && disabled && (
          <span className={assigneeSelectorStyles.empty}>{BOARD_MSG.ASSIGNEE_EMPTY}</span>
        )}
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <DropdownPanel
          allUsers={allUsers}
          isAssigned={isAssigned}
          onToggle={toggleUser}
          me={me ?? null}
        />
      )}
    </div>
  )
}

// ── 드롭다운 패널 (공통) ─────────────────────────────
interface DropdownPanelProps {
  allUsers: Assignee[]
  isAssigned: (userId: number) => boolean
  onToggle: (user: Assignee) => void
  // 현재 로그인 유저 (나에게 할당 버튼에 사용)
  me: { userId: number; username: string } | null
}

function DropdownPanel({ allUsers, isAssigned, onToggle, me }: DropdownPanelProps) {
  // 나에게 할당/해제 여부
  const isMeAssigned = me ? isAssigned(me.userId) : false

  const handleAssignToMe = () => {
    if (!me) return
    onToggle({ id: me.userId, username: me.username })
  }

  return (
    <div className={assigneeSelectorStyles.dropdown}>
      <p className={assigneeSelectorStyles.dropdownTitle}>{BOARD_MSG.ASSIGNEE_SELECT_TITLE}</p>

      {/* 나에게 할당 버튼 */}
      {me && (
        <button
          type='button'
          onClick={handleAssignToMe}
          className={assigneeSelectorStyles.assignToMe({ assigned: isMeAssigned })}
        >
          <UserCheck size={13} />
          {isMeAssigned ? BOARD_MSG.ASSIGNEE_UNASSIGN_FROM_ME : BOARD_MSG.ASSIGNEE_ASSIGN_TO_ME}
        </button>
      )}

      {allUsers.length === 0 ? (
        <p className={assigneeSelectorStyles.dropdownEmpty}>{BOARD_MSG.ASSIGNEE_DROPDOWN_EMPTY}</p>
      ) : (
        <ul className={assigneeSelectorStyles.userList}>
          {allUsers.map((user) => {
            const assigned = isAssigned(user.id)
            return (
              <li key={user.id}>
                <button
                  type='button'
                  onClick={() => onToggle(user)}
                  className={assigneeSelectorStyles.userItem({ assigned })}
                >
                  {/* 사용자 아바타 */}
                  <div
                    className={`${assigneeSelectorStyles.userAvatar} ${getAvatarBgColor(user.id)}`}
                  >
                    {getInitials(user.username)}
                  </div>

                  {/* 사용자명 */}
                  <span className={assigneeSelectorStyles.userName}>{user.username}</span>

                  {/* 선택된 경우 체크 아이콘 */}
                  {assigned && <Check size={14} className={assigneeSelectorStyles.checkIcon} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
