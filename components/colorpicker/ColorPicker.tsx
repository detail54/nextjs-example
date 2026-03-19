'use client'

import { colorPickerStyles } from './ColorPicker.styles'

// 프리셋 색상 팔레트
export const PRESET_COLORS = [
  // 레드 계열
  '#ef4444',
  '#f87171',
  '#dc2626',
  // 오렌지/앰버 계열
  '#f97316',
  '#fb923c',
  '#f59e0b',
  '#fbbf24',
  // 옐로우/라임 계열
  '#eab308',
  '#a3e635',
  '#84cc16',
  // 그린 계열
  '#22c55e',
  '#16a34a',
  '#10b981',
  '#059669',
  // 시안/스카이 계열
  '#06b6d4',
  '#0ea5e9',
  '#38bdf8',
  // 블루 계열
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#6366f1',
  // 바이올렛/퍼플 계열
  '#8b5cf6',
  '#7c3aed',
  '#a855f7',
  '#d946ef',
  // 핑크/로즈 계열
  '#ec4899',
  '#f43f5e',
  '#fb7185',
  // 뉴트럴 계열
  '#94a3b8',
  '#64748b',
  '#475569',
  '#1e293b',
]

interface ColorPickerProps {
  // 현재 선택된 색상 (null이면 미선택)
  value: string | null
  onChange: (color: string | null) => void
}

// 프리셋 색상 스와치 + 리셋 버튼
export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className={colorPickerStyles.wrapper}>
      {/* 기본(리셋) 버튼 */}
      <button
        type='button'
        title='기본'
        className={colorPickerStyles.resetBtn}
        onClick={() => onChange(null)}
      >
        ×
      </button>

      {/* 색상 스와치 목록 */}
      {PRESET_COLORS.map((color) => (
        <button
          key={color}
          type='button'
          title={color}
          className={colorPickerStyles.swatch({ selected: value === color })}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  )
}
