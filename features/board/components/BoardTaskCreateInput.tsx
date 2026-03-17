'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { BOARD_MSG } from '@/context/boardMsg'
import { useTaskCreate } from '../hooks/useTaskCreate'
import { boardTaskCreateInputStyles } from './BoardTaskCreateInput.styles'

interface BoardTaskCreateInputProps {
  epicId: number
  onSuccess: () => void
  onCancel: () => void
}

// 칸반 컬럼 내 인라인 태스크 생성 입력 컴포넌트
export default function BoardTaskCreateInput({
  epicId,
  onSuccess,
  onCancel,
}: BoardTaskCreateInputProps) {
  // 태스크 제목
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { mutate: createTask, isPending } = useTaskCreate(epicId)

  // 카드 전체 영역 ref (외부 클릭 감지용)
  const cardRef = useRef<HTMLDivElement>(null)

  // 마운트 시 입력창 자동 포커스
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 외부 영역 클릭 시 제목이 비어있으면 취소
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        if (!title.trim()) onCancel()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [title, onCancel])

  const handleSave = () => {
    if (!title.trim() || isPending) return
    createTask(
      { title: title.trim() },
      {
        onSuccess: () => {
          setTitle('')
          onSuccess()
        },
      },
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div ref={cardRef} className={boardTaskCreateInputStyles.card}>
      {/* 제목 입력 */}
      <textarea
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={BOARD_MSG.TASK_TITLE_PLACEHOLDER}
        className={boardTaskCreateInputStyles.input}
        rows={2}
        maxLength={200}
      />

      {/* 저장 버튼 */}
      <div className={boardTaskCreateInputStyles.footer}>
        <button
          type='button'
          className={boardTaskCreateInputStyles.saveButton}
          onClick={handleSave}
          disabled={!title.trim() || isPending}
          aria-label='저장'
        >
          <Icon icon={Check} size='sm' />
        </button>
      </div>
    </div>
  )
}
