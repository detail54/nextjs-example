import type { Config } from 'tailwindcss'

// 색상 토큰은 app/globals.css @theme 블록에서 CSS 변수로 정의
// (테마 전환 지원을 위해 CSS 변수 기반으로 관리)
const config: Config = {
  theme: {
    extend: {},
  },
}

export default config
