'use client'

import EpicSidePanel from './side-panel/EpicSidePanel'
import TaskSidePanel from './side-panel/TaskSidePanel'

// 루트 레이아웃에 마운트되는 전역 패널 렌더러
export default function PanelProvider() {
  return (
    <>
      <EpicSidePanel />
      <TaskSidePanel />
    </>
  )
}
