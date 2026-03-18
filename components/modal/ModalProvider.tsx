'use client'

import ConfirmModal from './ConfirmModal'
import BasicModal from './BasicModal'

// 루트 레이아웃에 마운트되는 전역 모달 렌더러
export default function ModalProvider() {
  return (
    <>
      <ConfirmModal />
      <BasicModal />
    </>
  )
}
