'use client'

import { Plus } from 'lucide-react'
import { BOARD_MSG } from '@/context/messages/boardMsg'
import { useBoardQuery } from '../hooks/useBoardQuery'
import { useEpicPanelStore } from '@/stores/useEpicPanelStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import BoardEpicAccordion from './BoardEpicAccordion'
import BoardEpicAccordionSkeleton from './BoardEpicAccordionSkeleton'
import BasicButton from '@/components/button/BasicButton'
import { boardPageStyles } from './BoardPage.styles'

// 보드 메인 페이지
export default function BoardPage() {
  const { data: epics = [], isLoading } = useBoardQuery()
  const { isAdmin } = useAuth()
  const { openEpicCreate } = useEpicPanelStore()

  return (
    <div className={boardPageStyles.container}>
      <div className={boardPageStyles.content}>
        {/* 페이지 헤더 */}
        <div className={boardPageStyles.header}>
          <h1 className={boardPageStyles.title}>{BOARD_MSG.PAGE_TITLE}</h1>
          {/* 관리자만 에픽 등록 버튼 표시 */}
          {isAdmin && (
            <BasicButton variant='primary' size='sm' onClick={openEpicCreate}>
              <Plus className='mr-1.5 h-4 w-4' />
              {BOARD_MSG.EPIC_REGISTER}
            </BasicButton>
          )}
        </div>

        {/* 에픽 목록 */}
        {isLoading ? (
          <BoardEpicAccordionSkeleton count={3} />
        ) : epics.length === 0 ? (
          <p className={boardPageStyles.empty}>{BOARD_MSG.EMPTY_EPICS}</p>
        ) : (
          <div className={boardPageStyles.epicList}>
            {epics.map((epic) => (
              <BoardEpicAccordion key={epic.id} epic={epic} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
