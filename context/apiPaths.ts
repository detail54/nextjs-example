// API 경로 중앙 관리
export const API_PATHS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  BOARD: {
    LIST: '/api/board',
    TASK_MOVE: (id: number) => `/api/board/tasks/${id}`,
    EPIC_CREATE: '/api/board/epics',
    TASK_CREATE: (epicId: number) => `/api/board/epics/${epicId}/tasks`,
    TASK_UPDATE: (id: number) => `/api/board/tasks/${id}`,
  },
} as const
