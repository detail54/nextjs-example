// API 경로 중앙 관리
export const API_PATHS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    REGISTER: '/api/auth/register',
    CHECK_USERNAME: '/api/auth/check-username',
    CHECK_EMAIL: '/api/auth/check-email',
    FIND_USERNAME: '/api/auth/find-username',
    FIND_PASSWORD: '/api/auth/find-password',
    RESET_PASSWORD: '/api/auth/reset-password',
  },
  NOTICE: {
    LIST: '/api/notice',
  },
  EPICS: {
    LIST: '/api/epics',
    CREATE: '/api/epics',
    UPDATE: (id: number) => `/api/epics/${id}`,
    DELETE: (id: number) => `/api/epics/${id}`,
  },
  TASKS: {
    CREATE: (epicId: number) => `/api/epics/${epicId}/tasks`,
    UPDATE: (id: number) => `/api/tasks/${id}`,
    DELETE: (id: number) => `/api/tasks/${id}`,
    MOVE: (id: number) => `/api/tasks/${id}`,
  },
} as const
