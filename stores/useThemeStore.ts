import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 지원 테마 타입
export type Theme = 'dark' | 'olive' | 'blue' | 'white'

type ThemeStore = {
  // 현재 적용 중인 테마
  theme: Theme
  // 테마 변경 및 DOM 반영
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme)
        }
      },
    }),
    { name: 'noto-theme' },
  ),
)
