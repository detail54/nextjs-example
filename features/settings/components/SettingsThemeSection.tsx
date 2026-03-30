'use client'

import SelectBox from '@/components/select/SelectBox'
import { useThemeStore } from '@/stores/useThemeStore'
import type { Theme } from '@/stores/useThemeStore'
import { SETTINGS_MSG } from '@/context/messages/settingsMsg'
import { settingsThemeSectionStyles } from './SettingsThemeSection.styles'

// 테마 옵션 목록
const THEME_OPTIONS: { label: string; value: Theme }[] = [
  { label: SETTINGS_MSG.THEME_DARK, value: 'dark' },
  { label: SETTINGS_MSG.THEME_OLIVE, value: 'olive' },
  { label: SETTINGS_MSG.THEME_BLUE, value: 'blue' },
  { label: SETTINGS_MSG.THEME_WHITE, value: 'white' },
]

// 화면 설정 섹션 - 테마 선택
export default function SettingsThemeSection() {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className={settingsThemeSectionStyles.card}>
      <h2 className={settingsThemeSectionStyles.sectionTitle}>{SETTINGS_MSG.APPEARANCE_SECTION}</h2>
      <div className={settingsThemeSectionStyles.row}>
        <span className={settingsThemeSectionStyles.label}>{SETTINGS_MSG.THEME_LABEL}</span>
        <SelectBox
          value={theme}
          options={THEME_OPTIONS}
          onChange={(value) => setTheme(value as Theme)}
        />
      </div>
    </div>
  )
}
