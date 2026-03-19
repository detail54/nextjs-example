'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { tooltipStyles } from './Tooltip.styles'

interface TooltipProps {
  // 툴팁에 표시할 내용
  content: React.ReactNode
  children: React.ReactElement
}

// 마우스 커서를 따라가는 portal 툴팁 (overflow 클리핑 방지)
export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  // 커서 기준 fixed 위치
  const [style, setStyle] = useState<React.CSSProperties>({})

  // 마우스 이동 시 커서 바로 위에 툴팁 위치 업데이트
  const handleMouseMove = (e: React.MouseEvent) => {
    setStyle({
      position: 'fixed',
      left: e.clientX,
      top: e.clientY - 10,
      transform: 'translate(-50%, -100%)',
      zIndex: 9999,
    })
  }

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible &&
        createPortal(
          <div className={tooltipStyles.box} style={style}>
            {content}
          </div>,
          document.body,
        )}
    </div>
  )
}
