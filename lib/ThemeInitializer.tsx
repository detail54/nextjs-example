'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/stores/useThemeStore'

// 테마 스토어 → DOM data-theme 동기화 컴포넌트
export default function ThemeInitializer() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return null
}
