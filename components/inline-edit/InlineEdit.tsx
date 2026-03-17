'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import Icon from '@/components/icon/Icon'
import { inlineEditStyles } from './InlineEdit.styles'

interface InlineEditProps {
  value: string
  onSave: (newValue: string) => void
  // true면 textarea, false면 input
  multiline?: boolean
  placeholder?: string
  // 값이 비어있을 때 표시할 텍스트
  emptyText?: string
  textClassName?: string
}

// 클릭 시 인라인 편집으로 전환되는 공통 컴포넌트
export default function InlineEdit({
  value,
  onSave,
  multiline = false,
  placeholder,
  emptyText = '클릭하여 편집',
  textClassName,
}: InlineEditProps) {
  // 편집 모드 여부
  const [isEditing, setIsEditing] = useState(false)
  // 편집 중 임시 값 (취소 시 원래 값으로 복원)
  const [editValue, setEditValue] = useState(value)

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 편집 시작 시 포커스 및 커서 끝으로 이동
  useEffect(() => {
    if (!isEditing) return
    if (multiline) {
      textareaRef.current?.focus()
      const len = textareaRef.current?.value.length ?? 0
      textareaRef.current?.setSelectionRange(len, len)
    } else {
      inputRef.current?.focus()
      const len = inputRef.current?.value.length ?? 0
      inputRef.current?.setSelectionRange(len, len)
    }
  }, [isEditing, multiline])

  const handleEditStart = () => {
    // 편집 시작 시점의 value로 초기화
    setEditValue(value)
    setIsEditing(true)
  }

  const handleSave = () => {
    const trimmed = editValue.trim()
    // 값이 변경된 경우에만 저장
    if (trimmed && trimmed !== value) {
      onSave(trimmed)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    // 이전 값으로 복원
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 단일 라인: Enter 저장
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div className={inlineEditStyles.wrapper}>
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={inlineEditStyles.input}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef}
            type='text'
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={inlineEditStyles.input}
          />
        )}

        {/* 저장 / 취소 버튼 */}
        <div className={inlineEditStyles.actions}>
          <button
            type='button'
            onClick={handleSave}
            className={inlineEditStyles.saveButton}
            aria-label='저장'
          >
            <Icon icon={Check} size='sm' />
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className={inlineEditStyles.cancelButton}
            aria-label='취소'
          >
            <Icon icon={X} size='sm' />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${inlineEditStyles.display} ${textClassName ?? ''}`}
      onClick={handleEditStart}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleEditStart()
      }}
    >
      {value ? value : <span className={inlineEditStyles.emptyText}>{emptyText}</span>}
    </div>
  )
}
