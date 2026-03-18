// 인증 이벤트 종류
export type AuthEvent =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAIL'
  | 'LOGOUT'
  | 'TOKEN_REFRESH'
  | 'SESSION_EXPIRED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'

type ApiLogOptions = {
  method: string
  path: string
  status: number
  duration: number
  user?: { username: string; role: string }
  reqBody?: unknown
  resBody?: unknown
}

type AuthLogOptions = {
  event: AuthEvent
  username?: string
  path?: string
  reason?: string
}

const LINE = '─'.repeat(72)
const now = () => new Date().toISOString()

function statusIcon(status: number): string {
  if (status >= 500) return '✗'
  if (status >= 400) return '△'
  return '✓'
}

// 인증 이벤트별 아이콘
function authIcon(event: AuthEvent): string {
  return event === 'LOGIN_SUCCESS' || event === 'TOKEN_REFRESH' || event === 'LOGOUT' ? '✓' : '△'
}

// 민감 정보 필드 마스킹 (password, token, secret 포함 키)
const SENSITIVE_KEYS = ['password', 'token', 'secret']
function maskSensitive(body: unknown): unknown {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body
  return Object.fromEntries(
    Object.entries(body as Record<string, unknown>).map(([k, v]) => [
      k,
      SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s)) ? '***' : v,
    ]),
  )
}

export const logger = {
  // API 요청/응답 로그
  api: ({ method, path, status, duration, user, reqBody, resBody }: ApiLogOptions) => {
    const icon = statusIcon(status)

    console.log(`┌${LINE}`)
    console.log(`│ ← ${method.padEnd(6)} ${path}`)
    console.log(`│    ${now()}`)
    console.log(`│    user: ${user ? `${user.username} [${user.role}]` : '(anonymous)'}`)
    if (reqBody) {
      console.log(`│    req : ${JSON.stringify(maskSensitive(reqBody))}`)
    }
    console.log(`├${LINE}`)
    console.log(`│ → ${icon} ${status}  (${duration}ms)`)
    if (resBody) {
      console.log(`│    res : ${JSON.stringify(maskSensitive(resBody))}`)
    }
    console.log(`└${LINE}`)
  },

  // 인증 이벤트 로그 (로그인, 토큰 갱신, 세션 만료 등)
  auth: ({ event, username, path, reason }: AuthLogOptions) => {
    const icon = authIcon(event)
    const parts: string[] = [`[${now()}] AUTH ${icon} ${event}`]
    if (username) parts.push(`[${username}]`)
    if (path) parts.push(`path: ${path}`)
    if (reason) parts.push(`reason: ${reason}`)
    console.log(parts.join('  '))
  },

  // 서버 에러 로그
  error: (message: string, err?: unknown) => {
    console.error(`[${now()}] ERROR  ${message}`, err instanceof Error ? err.stack : err)
  },
}
