'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { TIMELINE_MSG } from '@/context/messages/timelineMsg'
import { useTaskCreate } from '@/features/board/hooks/useTask'

interface TimelineTaskInlineCreateProps {
  epicId: number
  onSuccess: () => void
  onCancel: () => void
}

// 타임라인 에픽 하위 태스크 인라인 생성 입력 컴포넌트
export default function TimelineTaskInlineCreate({
  epicId,
  onSuccess,
  onCancel,
}: TimelineTaskInlineCreateProps) {
  // 태스크 제목
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { mutate: createTask, isPending } = useTaskCreate(epicId)

  // 마운트 시 자동 포커스
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 외부 클릭 시 취소
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onCancel()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [onCancel])

  const handleSave = () => {
    if (!title.trim() || isPending) return
    createTask(
      { title: title.trim() },
      {
        onSuccess: () => {
          onSuccess()
        },
      },
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div
      ref={wrapperRef}
      className='flex items-center gap-2 pl-14 pr-2 border-b border-secondary-600/60 bg-secondary-800 sticky left-0 z-10'
      style={
        {
          width: 'var(--left-width)',
          minWidth: 'var(--left-width)',
          height: 40,
        } as React.CSSProperties
      }
    >
      <input
        ref={inputRef}
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={TIMELINE_MSG.TASK_TITLE_PLACEHOLDER}
        className='flex-1 min-w-0 bg-transparent text-xs text-white placeholder:text-secondary-500 outline-none'
        maxLength={100}
      />
      {/* 저장 버튼 */}
      <button
        type='button'
        onClick={handleSave}
        disabled={!title.trim() || isPending}
        className='shrink-0 text-primary-400 hover:text-primary-300 disabled:opacity-30 transition-colors'
      >
        <Check size={13} />
      </button>
      {/* 취소 버튼 */}
      <button
        type='button'
        onClick={onCancel}
        className='shrink-0 text-secondary-400 hover:text-white transition-colors'
      >
        <X size={13} />
      </button>
    </div>
  )
}
