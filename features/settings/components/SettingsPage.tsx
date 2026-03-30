'use client'

import { SETTINGS_MSG } from '@/context/messages/settingsMsg'
import SettingsThemeSection from './SettingsThemeSection'
import { settingsPageStyles } from './SettingsPage.styles'

// 설정 페이지 컴포넌트
export default function SettingsPage() {
  return (
    <div className={settingsPageStyles.container}>
      <div className={settingsPageStyles.content}>
        <div className={settingsPageStyles.header}>
          <h1 className={settingsPageStyles.title}>{SETTINGS_MSG.PAGE_TITLE}</h1>
        </div>
        <div className={settingsPageStyles.sections}>
          <SettingsThemeSection />
        </div>
      </div>
    </div>
  )
}
