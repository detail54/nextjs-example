# Next.js 풀스택 예제 프로젝트

> 학습용으로 설계된 Next.js 풀스택 프로젝트입니다.
> 프론트엔드(React)와 백엔드(API Routes)가 하나의 저장소에서 어떻게 구성되는지,
> 실무에서 자주 쓰이는 패턴들을 코드를 통해 직접 확인할 수 있습니다.

---

## 목차

1. [사전 학습 필요 사항](#1-사전-학습-필요-사항)
2. [기술 스택](#2-기술-스택)
3. [시작하기](#3-시작하기)
4. [폴더 구조](#4-폴더-구조)
5. [데이터베이스 구조](#5-데이터베이스-구조)
6. [백엔드 코드 패턴](#6-백엔드-코드-패턴)
7. [인증(로그인) 로직](#7-인증로그인-로직)
8. [에러 처리 로직](#8-에러-처리-로직)
9. [Provider 패턴](#9-provider-패턴)
10. [프론트엔드 코드 패턴](#10-프론트엔드-코드-패턴)
11. [주요 기능 로직](#11-주요-기능-로직)
    - [11-1. 칸반 드래그 앤 드롭](#11-1-칸반-드래그-앤-드롭)
    - [11-2. 타임라인 (Gantt)](#11-2-타임라인-gantt)
    - [11-3. 권한 기반 UI 표시](#11-3-권한-기반-ui-표시)
    - [11-4. 사용자 관리 페이지](#11-4-사용자-관리-페이지)
12. [미구현 페이지](#12-미구현-페이지)

---

## 1. 사전 학습 필요 사항

이 프로젝트를 이해하려면 아래 개념들을 먼저 공부하는 것을 권장합니다.

### 필수 기초

| 분류           | 학습 주제                                                                 |
| -------------- | ------------------------------------------------------------------------- |
| **JavaScript** | ES6+ 문법, 비동기(async/await, Promise), 구조분해, 모듈(import/export)    |
| **TypeScript** | 기본 타입, 제너릭, 인터페이스/타입 alias, `as const`, 타입 추론           |
| **React**      | 컴포넌트, useState / useEffect, props, 커스텀 훅, Context                 |
| **Next.js**    | App Router, Server/Client Component, Route Handlers(API 라우트), 레이아웃 |
| **HTTP**       | REST API, 상태 코드(200/401/403/500), 쿠키, 헤더                          |

### 중급 개념 (프로젝트에서 사용)

| 분류              | 학습 주제                                                     |
| ----------------- | ------------------------------------------------------------- |
| **React Query**   | useQuery, useMutation, queryKey, invalidateQueries, staleTime |
| **Zustand**       | create, devtools middleware, 전역 상태                        |
| **JWT**           | Access Token / Refresh Token 구조, HttpOnly 쿠키              |
| **ORM (Drizzle)** | 스키마 정의, select / insert / update / delete                |
| **CVA**           | class-variance-authority를 이용한 스타일 변형                 |
| **DnD Kit**       | DndContext, useSensor, DragOverlay                            |

---

## 2. 기술 스택

### 프론트엔드

| 라이브러리                     | 용도                          |
| ------------------------------ | ----------------------------- |
| Next.js 16 (App Router)        | 풀스택 프레임워크             |
| React 19                       | UI 렌더링                     |
| TailwindCSS 4                  | 유틸리티 기반 스타일링        |
| class-variance-authority (CVA) | 컴포넌트 variant 스타일 관리  |
| TanStack React Query 5         | 서버 상태(비동기 데이터) 관리 |
| Zustand 5                      | 클라이언트 전역 상태 관리     |
| Axios                          | HTTP 클라이언트               |
| dnd-kit                        | 드래그 앤 드롭                |
| Sonner                         | 토스트 알림                   |
| Lucide React                   | 아이콘                        |

### 백엔드

| 라이브러리             | 용도                 |
| ---------------------- | -------------------- |
| Next.js Route Handlers | API 엔드포인트       |
| better-sqlite3         | SQLite 드라이버      |
| Drizzle ORM            | TypeScript-first ORM |
| jose                   | JWT 발급 / 검증      |
| bcryptjs               | 비밀번호 해싱        |

---

## 3. 시작하기

### 3-1. Homebrew 설치

Homebrew는 macOS 패키지 매니저입니다. Node.js와 pnpm을 쉽게 설치하려면 먼저 설치합니다.

터미널을 열고 아래 명령어를 실행하세요.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/homebrew/install/HEAD/install.sh)"
```

설치가 완료되면 확인합니다.

```bash
brew --version
```

---

### 3-2. Node.js 설치

이 프로젝트는 **Node.js 20 이상**이 필요합니다. (20, 22, 25 등 LTS/최신 버전 모두 사용 가능)
`nvm`(Node Version Manager)을 사용하면 여러 버전을 관리하기 편합니다. (선택사항)

**nvm 설치:**

```bash
brew install nvm
```

설치 후 셸 설정 파일(`~/.zshrc`)에 아래 내용을 추가해야 nvm 명령어를 쓸 수 있습니다.

```bash
# ~/.zshrc 에 추가 (터미널에서 아래 명령어 실행)
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc

# 변경 내용 적용
source ~/.zshrc
```

**Node.js 25 설치:**

```bash
nvm install 25
nvm use 25
```

설치 확인:

```bash
node --version   # v25.x.x 출력되면 성공
```

---

### 3-3. pnpm 설치

pnpm은 이 프로젝트에서 사용하는 패키지 매니저입니다. npm보다 빠르고 디스크 공간을 적게 사용합니다.

```bash
npm install -g pnpm
```

설치 확인:

```bash
pnpm --version   # 9.x.x 출력되면 성공
```

---

### 3-4. 프로젝트 클론

```bash
git clone <저장소 URL>
cd nextjs-example
```

---

### 3-5. 환경 변수 설정

`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.example .env.local
```

텍스트 에디터로 `.env.local`을 열어 SECRET 값을 설정합니다.

```env
# .env.local

ACCESS_TOKEN_SECRET=여기에-충분히-긴-랜덤-문자열-입력
ACCESS_TOKEN_COOKIE_NAME=access_token

REFRESH_TOKEN_SECRET=위와-다른-충분히-긴-랜덤-문자열-입력
REFRESH_TOKEN_COOKIE_NAME=refresh_token
```

> **SECRET 값 생성 팁**: 터미널에서 아래 명령어로 랜덤 문자열을 만들 수 있습니다.
>
> ```bash
> openssl rand -base64 32
> ```
>
> 실행할 때마다 다른 값이 나옵니다. ACCESS용, REFRESH용 각각 한 번씩 실행해서 사용하세요.

---

### 3-6. 패키지 설치 및 실행

```bash
# 패키지 설치
pnpm install

# pnpm better-sqlite3 빌드 warning 메세지 출력시
npm build better-sqlite3

# 개발 서버 실행
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

서버가 처음 시작되면 다음이 자동으로 처리됩니다.

- `db.sqlite` 파일 생성
- 테이블 생성
- 기본 계정(`admin`) 생성
- 샘플 공지사항 3개 삽입

터미널에 아래와 같이 출력되면 정상입니다.

```
✔ admin 계정 생성 (admin / admin123)
✔ 기본 공지사항 생성
```

**기본 계정**

| 아이디 | 비밀번호 | 권한  |
| ------ | -------- | ----- |
| admin  | admin123 | ADMIN |

---

## 4. 폴더 구조

```
nextjs-example/
│
├── app/                        # Next.js App Router
│   ├── (main)/                 # 인증 후 메인 레이아웃 그룹
│   │   ├── layout.tsx          # LNB + 콘텐츠 + 사이드 패널 레이아웃
│   │   ├── board/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── timeline/page.tsx
│   │   ├── notice/page.tsx
│   │   ├── notice-manage/page.tsx
│   │   ├── user-manage/page.tsx
│   │   └── my-page/page.tsx
│   │
│   ├── api/                    # Route Handlers (백엔드 API)
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── refresh/route.ts
│   │   ├── board/
│   │   │   ├── route.ts                    # 전체 보드 조회
│   │   │   ├── epics/
│   │   │   │   ├── route.ts                # 에픽 생성
│   │   │   │   └── [epicId]/
│   │   │   │       ├── route.ts            # 에픽 수정/삭제
│   │   │   │       └── tasks/route.ts      # 태스크 생성
│   │   │   └── tasks/[id]/route.ts         # 태스크 수정(이동)
│   │   ├── notice/route.ts                 # 공지사항 목록
│   │   └── users/
│   │       ├── route.ts                    # 사용자 목록 조회 (ADMIN)
│   │       └── [id]/role/route.ts          # 사용자 역할 변경 (ADMIN)
│   │
│   ├── auth/login/page.tsx     # 로그인 페이지
│   ├── login-required/page.tsx # 미로그인 접근 안내
│   ├── session-expired/page.tsx# 세션 만료 안내
│   ├── unauthorized/page.tsx   # 권한 없음 안내
│   ├── layout.tsx              # 루트 레이아웃 (Providers, Toaster)
│   └── page.tsx                # 홈 (랜딩 페이지)
│
├── layouts/                    # 앱 셸 레이아웃 컴포넌트
│   └── lnb/                    # 사이드 내비게이션
│       ├── Lnb.tsx
│       ├── Lnb.styles.ts
│       ├── LnbMenuItem.tsx
│       ├── LnbMenuItem.styles.ts
│       └── type.ts
│
├── features/                   # 기능별 모듈 (프론트엔드의 핵심)
│   ├── common/
│   │   ├── api/                # 에픽/태스크 공통 API (보드·타임라인 공유)
│   │   └── components/         # EpicSidePanel, TaskSidePanel
│   ├── auth/
│   │   ├── api/                # API 호출 함수 + 타입 + queryKeys
│   │   ├── components/         # 로그인 폼 컴포넌트
│   │   └── hooks/              # useLogin, useLogout, useSession, useAuth
│   ├── board/
│   │   ├── api/
│   │   ├── components/
│   │   └── hooks/
│   ├── notice/
│   │   ├── api/
│   │   ├── components/
│   │   └── hooks/
│   ├── timeline/
│   │   ├── components/         # TimelinePage, TimelineEpicRow, TimelineTaskInlineCreate
│   │   └── utils/              # timelineUtils (날짜→픽셀 변환, 월 목록 등)
│   ├── user-manage/
│   │   ├── api/                # userApi, queryKeys, type
│   │   ├── components/         # UserManagePage
│   │   └── hooks/              # useUserQuery, useUserRoleUpdate
│   ├── calendar/components/    # 미구현
│   ├── my-page/components/     # 미구현
│   └── notice-manage/components/ # 미구현
│
├── components/                 # 공용 UI 컴포넌트 (기능 무관 범용 프리미티브)
│   ├── button/                 # BasicButton, IconButton, LinkButton, TextButton
│   ├── input/                  # BasicInput
│   ├── modal/                  # Modal, BasicModal, ConfirmModal, ModalProvider
│   ├── panel/                  # SidePanel (범용 패널 UI)
│   │   ├── SidePanel.tsx
│   │   └── SidePanel.styles.ts
│   ├── list/                   # DataList, DataListSkeleton
│   ├── pagination/             # Pagination
│   ├── select/                 # SelectBox (portal 기반 드롭다운)
│   ├── dropdown/               # DropdownMenu (portal 방식)
│   ├── datepicker/             # DatePicker
│   ├── inline-edit/            # InlineEdit
│   └── icon/                   # Icon 래퍼
│
├── server/                     # 서버 전용 코드 (브라우저에서 실행 안 됨)
│   ├── core/
│   │   ├── db/
│   │   │   ├── db.ts           # DB 연결 + 테이블 생성 + 초기 데이터
│   │   │   ├── schema.ts       # Drizzle 스키마 정의
│   │   │   └── type.ts         # DB row 타입 + Response 공용 타입
│   │   ├── lib/
│   │   │   ├── withLogger.ts   # 요청/응답 로깅 미들웨어
│   │   │   └── logger.ts       # 콘솔 로거
│   │   ├── messages/
│   │   │   └── httpStatus.ts   # HTTP 상태 메시지 상수
│   │   └── type.ts             # 공용 서버 타입
│   ├── auth/
│   │   ├── auth.repository.ts
│   │   ├── auth.service.ts
│   │   ├── authenticate.ts     # 인증/권한 검사 유틸
│   │   ├── authError.ts        # 인증 커스텀 에러 클래스
│   │   ├── authMsg.ts
│   │   ├── jwt.ts              # JWT 발급/검증
│   │   ├── type.ts
│   │   └── withAuth.ts         # 인증 미들웨어 (route 래퍼)
│   ├── epics/
│   │   ├── epic.repository.ts
│   │   ├── epic.service.ts
│   │   ├── epicMsg.ts
│   │   └── type.ts
│   ├── notices/
│   │   ├── notice.repository.ts
│   │   ├── notice.service.ts
│   │   └── type.ts
│   ├── tasks/
│   │   ├── task.repository.ts
│   │   ├── task.service.ts
│   │   ├── taskMsg.ts
│   │   └── type.ts
│   └── users/
│       ├── user.repository.ts
│       ├── user.service.ts
│       ├── userMsg.ts
│       └── type.ts
│
├── stores/                     # Zustand 전역 상태
│   ├── useBasicModalStore.ts   # BasicModal 상태
│   ├── useConfirmModalStore.ts # ConfirmModal 상태
│   ├── useEpicPanelStore.ts    # 에픽 등록/수정 패널 상태
│   └── useTaskPanelStore.ts    # 태스크 상세 패널 상태
│
├── context/                    # 앱 전체 상수/설정
│   ├── apiPaths.ts             # API 경로 상수
│   ├── appPaths.ts             # 페이지 경로 상수
│   ├── constants.ts            # 도메인 상수 (TASK_STATUS, EPIC_STATUS, USER_ROLE)
│   ├── menuConfig.ts           # LNB 메뉴 설정 (COMMON_MENU_LIST, ADMIN_MENU_LIST)
│   ├── pageTitles.ts           # 페이지 제목 메타데이터
│   └── messages/               # UI 메시지 상수
│
├── lib/
│   ├── Providers.tsx           # QueryClientProvider + ModalProvider 래퍼
│   └── queryClient.ts          # QueryClient 설정
│
└── db.sqlite                   # SQLite 데이터베이스 파일 (자동 생성)
```

### 핵심 설계 원칙

**`app/` vs `features/`의 분리**

`app/` 폴더의 `page.tsx`는 최대한 얇게 유지합니다.
실제 UI 로직은 `features/` 안의 컴포넌트에 위임합니다.

```tsx
// app/(main)/board/page.tsx — 매우 얇은 페이지
import BoardPage from '@/features/board/components/BoardPage'
export default function Page() {
  return <BoardPage />
}
```

이렇게 하면 `features/board/`만 보면 보드 기능 전체를 파악할 수 있습니다.

---

## 5. 데이터베이스 구조

SQLite를 사용하며 Drizzle ORM으로 스키마를 정의합니다.
앱 시작 시 `server/core/db/db.ts`에서 테이블을 자동으로 생성합니다.

### ERD 개요

```
users
 ├─< epic_assignees >─ epics ─< tasks >─< task_assignees >─ users
 └─< notices (author_id)
```

### 테이블 상세

#### `users` — 사용자

```sql
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  username    TEXT NOT NULL UNIQUE,       -- 로그인 아이디 (중복 불가)
  password    TEXT NOT NULL,              -- bcrypt 해시된 비밀번호
  role        TEXT DEFAULT 'USER',        -- 'USER' | 'ADMIN'
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### `epics` — 에픽 (대분류 작업 단위)

```sql
CREATE TABLE epics (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT DEFAULT 'active',    -- 'active' | 'inactive' | 'completed'
  due_date    TEXT,                      -- ISO 8601 문자열
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### `tasks` — 태스크 (에픽 하위 작업 단위)

```sql
CREATE TABLE tasks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  epic_id     INTEGER NOT NULL REFERENCES epics(id),
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT DEFAULT 'todo',      -- 'todo' | 'in_progress' | 'done'
  priority    INTEGER DEFAULT 0,         -- 숫자가 작을수록 위에 표시 (칸반 순서)
  due_date    TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

> **priority 설계**: 태스크를 칸반에서 드래그로 재정렬할 때 앞뒤 태스크의 priority 중간값을 사용합니다.
> 예) 앞 태스크 priority=1000, 뒤 태스크 priority=2000이면 삽입 태스크는 1500.

#### `epic_assignees` / `task_assignees` — N:M 담당자 중간 테이블

```sql
CREATE TABLE epic_assignees (
  epic_id  INTEGER NOT NULL REFERENCES epics(id),
  user_id  INTEGER NOT NULL REFERENCES users(id),
  PRIMARY KEY (epic_id, user_id)
);
```

#### `notices` — 공지사항

```sql
CREATE TABLE notices (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  author_id    INTEGER NOT NULL REFERENCES users(id),
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  is_pinned    INTEGER DEFAULT 0,         -- boolean (0/1)
  is_published INTEGER DEFAULT 1,         -- boolean (0/1)
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Drizzle 스키마 파일

`server/core/db/schema.ts`에서 TypeScript로 스키마를 정의합니다.
이 파일이 DB 테이블의 "설계도"이자, TypeScript 타입의 원천입니다.

```ts
// server/core/db/schema.ts

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  epicId: integer('epic_id')
    .notNull()
    .references(() => epics.id),
  title: text('title').notNull(),
  status: text('status', { enum: ['todo', 'in_progress', 'done'] })
    .default('todo')
    .notNull(),
  priority: integer('priority').default(0).notNull(),
  // ...
})
```

Drizzle 스키마에서 row 타입을 자동 추론할 수 있습니다:

```ts
// server/core/db/type.ts

export type DbTask = typeof tasks.$inferSelect
// → { id: number, epicId: number, title: string, status: 'todo' | 'in_progress' | 'done', ... }
```

---

## 6. 백엔드 코드 패턴

### 6-1. API Route 구조

Next.js App Router의 Route Handler를 사용합니다.
`app/api/` 폴더 아래 `route.ts` 파일이 API 엔드포인트가 됩니다.

```
app/api/board/epics/[epicId]/tasks/route.ts
→ POST /api/board/epics/123/tasks
```

모든 API는 `withAuth()` 또는 `withLogger()`로 감싸져 있습니다.

```ts
// app/api/board/route.ts

export const GET = withAuth(async (_request: NextRequest) => {
  const epics = epicRepository.getAll()
  // ...
  return NextResponse.json<ListResponse<EpicWithTasks>>({ success: true, data })
})
```

### 6-2. 응답 타입 규칙

모든 API 응답은 `server/core/db/type.ts`에 정의된 세 가지 타입 중 하나를 사용합니다.

```ts
// server/core/db/type.ts

// 단일 객체 응답
type BasicResponse<T> = {
  success: boolean
  data: T
  message?: string
}

// 배열 응답 (페이지네이션 없음)
type ListResponse<T> = {
  success: boolean
  data: T[]
}

// 페이지네이션 포함 배열 응답
type PageResponse<T> = {
  success: boolean
  data: T[]
  pagination: {
    page: number // 현재 페이지 (1-based)
    pageSize: number // 페이지당 항목 수
    total: number // 전체 항목 수
    totalPages: number // 전체 페이지 수
  }
}
```

이렇게 하면 클라이언트에서 `response.data.data`처럼 접근하는 방식이 통일됩니다.

### 6-3. Repository 패턴

API Route에서 SQL을 직접 작성하지 않고, 각 도메인 폴더(`server/epics/`, `server/users/` 등)의 repository 파일 함수들을 호출합니다.
각 도메인마다 repository 파일이 하나씩 있습니다.

```ts
// server/epics/epic.repository.ts

export const epicRepository = {
  /** 전체 epic 목록 조회 (최신순) */
  getAll() {
    return db.select().from(epics).orderBy(desc(epics.createdAt)).all()
  },

  /** epic 단건 조회 */
  getById(id: number) {
    return db.select().from(epics).where(eq(epics.id, id)).get()
  },

  /** epic 생성 */
  create({ title, description }: CreateEpicParams) {
    return db.insert(epics).values({ title, description }).run().lastInsertRowid
  },

  /** epic 수정 */
  update({ id, title, description, status, dueDate }: UpdateEpicParams) {
    return db
      .update(epics)
      .set({ title, description, status, dueDate, updatedAt: sql`CURRENT_TIMESTAMP` })
      .where(eq(epics.id, id))
      .run()
  },

  /** epic 삭제 */
  delete(id: number) {
    return db.delete(epics).where(eq(epics.id, id)).run()
  },
}
```

**장점**: API Route가 얇아지고, DB 쿼리 로직은 한 곳에서 관리됩니다.

### 6-4. withAuth 미들웨어

인증이 필요한 API는 `withAuth()`로 감쌉니다.
내부에서 쿠키의 액세스 토큰을 검증하고, 유효하면 `{ user }` 컨텍스트를 핸들러에 넘겨줍니다.

```ts
// server/auth/withAuth.ts

export function withAuth(handler: AuthedHandler, options: WithAuthOptions = {}) {
  return withLogger(async (request: NextRequest) => {
    try {
      // 1. 쿠키에서 액세스 토큰 추출
      const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
      if (!token) throw new AuthError(AuthErrorCode.UNAUTHORIZED)

      // 2. 토큰 검증 (만료/변조 구분)
      const user = await verifyAccessToken(token)

      // 3. 역할 검사 (옵션으로 특정 역할만 허용)
      if (options.roles && !options.roles.includes(user.role)) {
        throw new AuthError(AuthErrorCode.FORBIDDEN)
      }

      // 4. 핸들러 실행 (user 정보 전달)
      return await handler(request, { user })
    } catch (error) {
      if (error instanceof AuthError) {
        return NextResponse.json(
          { success: false, message: AUTH_ERROR_MSG[error.code] },
          { status: error.statusCode },
        )
      }
      // 예상치 못한 에러 → 500
      logger.error(`${request.method} ${request.nextUrl.pathname}`, error)
      return NextResponse.json(
        { success: false, message: SERVER_AUTH_MSG.SERVER_ERROR },
        { status: 500 },
      )
    }
  }, getUserFromToken)
}
```

**ADMIN 전용 API 만들기:**

```ts
export const DELETE = withAuth(
  async (request, { user }) => {
    // user.role === 'ADMIN' 보장됨
    // ...
  },
  { roles: ['ADMIN'] }, // 이 옵션만 추가하면 됨
)
```

### 6-5. withLogger 미들웨어

모든 API 요청/응답을 콘솔에 기록합니다.
`withAuth`는 내부에서 `withLogger`를 호출하므로, `withAuth`를 쓰면 자동으로 로깅됩니다.

```
┌────────────────────────────────────────────────────────────────────────
│ ← POST   /api/auth/login
│    2026-03-18T10:30:00.000Z
│    user: (anonymous)
│    req : {"username":"admin","password":"***"}
├────────────────────────────────────────────────────────────────────────
│ → ✓ 200  (12ms)
│    res : {"success":true,"data":{"id":1,"username":"admin","role":"ADMIN"}}
└────────────────────────────────────────────────────────────────────────
```

`password`, `token`, `secret`이 포함된 필드는 자동으로 `***`로 마스킹됩니다.

```ts
// server/core/lib/logger.ts

const SENSITIVE_KEYS = ['password', 'token', 'secret']

function maskSensitive(body: unknown): unknown {
  if (!body || typeof body !== 'object') return body
  return Object.fromEntries(
    Object.entries(body as Record<string, unknown>).map(([k, v]) => [
      k,
      SENSITIVE_KEYS.some((s) => k.toLowerCase().includes(s)) ? '***' : v,
    ]),
  )
}
```

---

## 7. 인증(로그인) 로직

### 7-1. 개요

이 프로젝트는 **JWT (JSON Web Token)** 기반의 인증을 사용합니다.
토큰을 **HttpOnly 쿠키**에 저장해 JavaScript에서 직접 접근할 수 없게 하여 XSS 공격을 방지합니다.

| 토큰 종류     | 수명 | 용도                |
| ------------- | ---- | ------------------- |
| Access Token  | 15분 | API 요청 인증       |
| Refresh Token | 7일  | Access Token 재발급 |

### 7-2. 로그인 흐름

```
[브라우저]                          [서버]
    │                                  │
    │── POST /api/auth/login ──────────▶│
    │   { username, password }          │
    │                                  │ 1. DB에서 username 조회
    │                                  │ 2. bcrypt로 비밀번호 검증
    │                                  │ 3. Access Token (15분) 발급
    │                                  │ 4. Refresh Token (7일) 발급
    │◀── 200 OK ───────────────────────│
    │   Set-Cookie: access_token=...    │  (HttpOnly)
    │   Set-Cookie: refresh_token=...   │  (HttpOnly)
    │   { id, username, role }          │
```

```ts
// app/api/auth/login/route.ts

export const POST = withLogger(async (request: NextRequest) => {
  const { username, password } = await request.json()

  // 1. DB 조회
  const user = authRepository.findByUsername(username)
  if (!user) {
    return NextResponse.json(
      { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    )
  }

  // 2. 비밀번호 검증 (평문 vs 해시 비교)
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
      { status: 401 },
    )
  }

  // 3. 두 토큰 동시 발급
  const tokenPayload = { userId: user.id, username: user.username, role: user.role }
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(tokenPayload),
    signRefreshToken(tokenPayload),
  ])

  // 4. HttpOnly 쿠키에 저장 (JS에서 접근 불가)
  response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 15 * 60, // 15분
  })
  response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7일
  })
})
```

### 7-3. 토큰 갱신 흐름

Access Token이 만료되면 클라이언트가 자동으로 갱신을 시도합니다.

```
[브라우저]                          [서버]
    │                                  │
    │── GET /api/board ────────────────▶│
    │   (access_token 만료됨)           │ → 401 TOKEN_EXPIRED 반환
    │◀── 401 ─────────────────────────│
    │                                  │
    │── POST /api/auth/refresh ────────▶│
    │   (refresh_token 유효)            │ → 새 access_token 발급
    │◀── 200 ─────────────────────────│
    │   Set-Cookie: access_token=새것  │
    │                                  │
    │── GET /api/board ────────────────▶│  (원래 요청 재시도)
    │◀── 200 ─────────────────────────│
```

```ts
// app/api/auth/refresh/route.ts

export const POST = withLogger(async (request: NextRequest) => {
  // 1. refresh_token 쿠키 추출
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
  if (!refreshToken) return 401 에러

  // 2. refresh token 검증 (만료되면 AuthError 발생)
  const user = await verifyRefreshToken(refreshToken)

  // 3. 새 access token만 재발급 (refresh token은 유지)
  const newAccessToken = await signAccessToken({
    userId: user.userId,
    username: user.username,
    role: user.role,
  })

  response.cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, { ... })
})
```

refresh token도 만료되면 세션이 완전히 만료된 것으로 처리하고 `/session-expired`로 이동합니다.

### 7-4. JWT 발급/검증

`server/auth/jwt.ts`에서 `jose` 라이브러리로 JWT를 다룹니다.

```ts
// server/auth/jwt.ts

// Access Token 발급 (HS256 알고리즘, 15분 유효)
export async function signAccessToken(payload: JwtUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(ACCESS_SECRET) // 환경변수의 SECRET으로 서명
}

// Access Token 검증 — 만료(TOKEN_EXPIRED) vs 변조(INVALID_TOKEN) 구분
export async function verifyAccessToken(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET)
    return payload as unknown as JwtUserPayload
  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      throw new AuthError(AuthErrorCode.TOKEN_EXPIRED) // 만료됨 → 갱신 시도 가능
    }
    throw new AuthError(AuthErrorCode.INVALID_TOKEN) // 변조됨 → 로그아웃 필요
  }
}
```

### 7-5. 세션 조회 (`/api/auth/me`)

페이지가 로드될 때 클라이언트는 `/api/auth/me`를 호출해 현재 로그인 유저 정보를 가져옵니다.

```ts
// features/auth/hooks/useSession.ts

export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: meApi,
    staleTime: Infinity, // 세션 정보는 만료되지 않음 (명시적 invalidate로만 갱신)
    retry: false, // 401 에러 시 재시도 없이 즉시 null 처리
    select: (res) => res.data,
  })
}
```

---

## 8. 에러 처리 로직

### 8-1. 커스텀 에러 클래스

인증 관련 에러는 `AuthError` 클래스로 표현합니다.
에러 코드마다 HTTP 상태 코드가 매핑되어 있습니다.

```ts
// server/auth/authError.ts

export const AuthErrorCode = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', status: 401 }, // 토큰 없음
  TOKEN_EXPIRED: { code: 'TOKEN_EXPIRED', status: 401 }, // 토큰 만료
  INVALID_TOKEN: { code: 'INVALID_TOKEN', status: 401 }, // 토큰 변조
  FORBIDDEN: { code: 'FORBIDDEN', status: 403 }, // 권한 없음
} as const

export class AuthError extends Error {
  readonly code: AuthErrorCode
  readonly statusCode: number

  constructor({ code, status }: (typeof AuthErrorCode)[keyof typeof AuthErrorCode]) {
    super(code)
    this.name = 'AuthError'
    this.code = code
    this.statusCode = status
  }
}
```

**사용 예시:**

```ts
// 토큰 없음 → 401 UNAUTHORIZED
if (!token) throw new AuthError(AuthErrorCode.UNAUTHORIZED)

// 권한 없음 → 403 FORBIDDEN
if (user.role !== 'ADMIN') throw new AuthError(AuthErrorCode.FORBIDDEN)
```

### 8-2. 서버 에러 처리 패턴

`withAuth` 내부에서 에러를 일괄 처리합니다.
`AuthError`는 코드에 맞는 HTTP 상태로 응답하고, 그 외 예상치 못한 에러는 500으로 처리합니다.

```ts
// server/auth/withAuth.ts (에러 처리 부분)

} catch (error) {
  if (error instanceof AuthError) {
    // 인증/권한 에러 → 적절한 HTTP 상태 코드 반환
    return NextResponse.json(
      { success: false, message: AUTH_ERROR_MSG[error.code] },
      { status: error.statusCode },
    )
  }

  // 예상치 못한 에러 → 500 Internal Server Error + 로그 기록
  logger.error(`${request.method} ${request.nextUrl.pathname}`, error)
  return NextResponse.json(
    { success: false, message: SERVER_AUTH_MSG.SERVER_ERROR },
    { status: 500 },
  )
}
```

### 8-3. 클라이언트 에러 처리 패턴

Axios 에러를 받아 서버의 `message` 필드를 추출해 사용자에게 토스트로 보여줍니다.

```ts
// features/auth/api/loginApi.ts

export async function loginApi(data: LoginRequest) {
  try {
    const response = await axios.post(API_PATHS.AUTH.LOGIN, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 서버 응답에 message가 있으면 그것을, 없으면 기본 메시지 사용
      throw new Error(error.response?.data?.message ?? AUTH_MSG.LOGIN_FAILED)
    }
    throw error
  }
}
```

```ts
// features/auth/hooks/useLogin.ts

export function useLogin({ onSuccess } = {}) {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => onSuccess?.(),
    onError: (error: Error) => {
      // 에러 메시지를 토스트로 표시
      toast.error(error.message ?? AUTH_MSG.LOGIN_FAILED, {
        description: AUTH_MSG.LOGIN_FAILED_DESC,
      })
    },
  })
}
```

### 8-4. 에러 안내 페이지

| 경로               | 상황                           | 파일                           |
| ------------------ | ------------------------------ | ------------------------------ |
| `/login-required`  | 미로그인 상태로 보호 경로 접근 | `app/login-required/page.tsx`  |
| `/session-expired` | Refresh Token 만료             | `app/session-expired/page.tsx` |
| `/unauthorized`    | 권한(role) 없이 접근           | `app/unauthorized/page.tsx`    |

---

## 9. Provider 패턴

### 9-1. Provider란?

React에서 **Provider**는 컴포넌트 트리 전체에 어떤 값(상태, 함수, 인스턴스 등)을 **내려주는 컴포넌트**입니다.
`props`로 하나하나 전달하지 않아도 하위 컴포넌트 어디서든 해당 값에 접근할 수 있게 됩니다.

```
<Provider value={...}>
  <부모 컴포넌트>
    <자식 컴포넌트>
      <손자 컴포넌트>  ← 여기서도 value에 접근 가능
```

React 기본 제공인 `Context.Provider`가 이 개념의 토대이며,
외부 라이브러리(React Query, Zustand 등)도 같은 방식으로 Provider를 제공합니다.

---

### 9-2. 이 프로젝트의 Provider 구조

앱이 시작되면 `app/layout.tsx`(루트 레이아웃)에서 모든 Provider가 한꺼번에 감싸집니다.

```tsx
// app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body>
        <Providers>
          {' '}
          {/* ① React Query Provider + 전역 모달 */}
          {children}
          <Toaster /> {/* ② 토스트 알림 */}
        </Providers>
      </body>
    </html>
  )
}
```

각 Provider의 역할:

| Provider          | 위치                | 역할                                                | 파일                                 |
| ----------------- | ------------------- | --------------------------------------------------- | ------------------------------------ |
| `<Providers>`     | `app/layout.tsx`    | React Query `QueryClient` 공급 + ModalProvider 포함 | `lib/Providers.tsx`                  |
| `<ModalProvider>` | `lib/Providers.tsx` | BasicModal, ConfirmModal을 루트에 마운트            | `components/modal/ModalProvider.tsx` |
| `<Toaster>`       | `app/layout.tsx`    | Sonner 토스트 알림 루트 마운트                      | `app/layout.tsx`                     |

---

### 9-3. QueryClientProvider — React Query

React Query는 서버에서 받은 데이터를 **캐시**로 관리합니다.
이 캐시를 담는 그릇이 `QueryClient`이고, `QueryClientProvider`가 이를 앱 전체에 공급합니다.

```tsx
// lib/Providers.tsx

'use client' // Provider는 클라이언트 컴포넌트여야 함

export default function Providers({ children }) {
  // useState로 감싸는 이유:
  // 컴포넌트가 리렌더링될 때마다 새 인스턴스가 생성되는 것을 막기 위해
  const [queryClient] = useState(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} /> {/* 개발 환경 전용 디버그 툴 */}
    </QueryClientProvider>
  )
}
```

```ts
// lib/queryClient.ts

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분간 캐시를 fresh로 유지 (불필요한 재요청 방지)
        retry: 1, // 실패 시 1번 재시도
      },
    },
  })
}
```

**왜 `useState`로 감싸나요?**

```tsx
// ❌ 잘못된 방법 — 리렌더링마다 새 QueryClient 생성 → 캐시 초기화
const queryClient = createQueryClient()

// ✅ 올바른 방법 — 최초 한 번만 생성 후 유지
const [queryClient] = useState(() => createQueryClient())
```

**QueryClientProvider가 없으면?**

```
Error: No QueryClient set, use QueryClientProvider to set one
```

`useQuery`, `useMutation` 등 React Query 훅은 내부적으로 `QueryClientProvider`가 공급한
`QueryClient` 인스턴스를 찾습니다. Provider가 없으면 에러가 발생합니다.

---

### 9-4. ModalProvider — 전역 모달

모달은 DOM 최상단에 렌더링되어야 다른 요소 위에 올바르게 표시됩니다.
`ModalProvider`를 루트 레이아웃에 한 번 마운트하면, 어떤 컴포넌트에서든 Zustand store를 통해 모달을 열 수 있습니다.

```tsx
// components/modal/ModalProvider.tsx

'use client'

export default function ModalProvider() {
  return (
    <>
      <ConfirmModal /> {/* useConfirmModalStore 구독 */}
      <BasicModal /> {/* useBasicModalStore 구독 */}
    </>
  )
}
```

각 모달 컴포넌트는 Zustand store를 구독하다가 `modal` 상태가 null이 아니면 화면에 표시됩니다.

```
[어떤 컴포넌트]
  openBasicModal({ title: '제목', children: <내용/> })
         ↓
  Zustand store 상태 변경 (modal = { title, children })
         ↓
  [BasicModal] 구독 중이므로 자동 리렌더 → 모달 표시
```

이 방식 덕분에 모달을 열기 위해 부모 컴포넌트에 `isOpen` state나 `onOpen` props를 만들 필요가 없습니다.

---

### 9-5. 사이드 패널 — 전역 사이드 패널

사이드 패널은 모달과 달리 **페이지를 밀어내는 효과**가 있습니다.
이를 위해 `EpicSidePanel`과 `TaskSidePanel`은 `<main>` 태그와 **flex 형제**로 직접 배치됩니다.

```tsx
// app/(main)/layout.tsx

import { Lnb } from '@/layouts/lnb/Lnb'
import EpicSidePanel from '@/features/common/components/EpicSidePanel'
import TaskSidePanel from '@/features/common/components/TaskSidePanel'

export default function MainLayout({ children }) {
  return (
    <div className='flex h-screen bg-secondary-950'>
      <Lnb />
      <main className='flex-1 overflow-auto'>{children}</main>
      <EpicSidePanel /> {/* ← main과 나란히 배치 */}
      <TaskSidePanel /> {/* ← main과 나란히 배치 */}
    </div>
  )
}
```

패널이 열리면 SidePanel의 너비가 0 → 지정 너비로 transition되며, flex 레이아웃 덕분에 `<main>`이 자연스럽게 좁아집니다.

각 패널 컴포넌트는 자신의 스토어만 구독하며, 스토어에 상태가 생기면 SidePanel을 열고 해당 콘텐츠를 렌더링합니다.

```
[어떤 컴포넌트]
  openEpicCreate()
       ↓
  useEpicPanelStore 상태 변경 (panel = { type: 'epicCreate' })
       ↓
  [EpicSidePanel] 구독 중이므로 자동 리렌더 → 패널 열림
       ↓
  <main>이 밀려서 좁아지는 애니메이션 발생
```

패널 너비는 드래그로 조절 가능하며, 조절된 너비는 각 스토어의 `panelWidth`에 저장됩니다.

> 모달처럼 루트에 올리지 않는 이유: `Providers.tsx`에 넣으면 flex 레이아웃 바깥에 위치해 페이지 밀림 효과가 동작하지 않기 때문입니다.
>
> `EpicSidePanel`과 `TaskSidePanel`은 보드·타임라인 등 여러 기능에서 공유하므로 `features/common/components/`에 위치합니다. 기반이 되는 범용 UI 컴포넌트 `SidePanel`은 `components/panel/`에 있습니다.

---

### 9-6. 'use client' 와 Provider의 관계

Next.js App Router에서 컴포넌트는 기본적으로 **Server Component**입니다.
하지만 Provider는 React의 `useState`, `createContext` 등 **브라우저에서만 동작하는 기능**을 사용하므로
반드시 파일 맨 위에 `'use client'`를 선언해야 합니다.

```tsx
'use client' // ← 이게 없으면 에러 발생

import { QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }) {
  const [queryClient] = useState(() => createQueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
```

**Server Component인 `app/layout.tsx`가 Client Component인 `<Providers>`를 감쌀 수 있는 이유:**
`children`으로 전달되는 컴포넌트는 Provider의 클라이언트 경계 안에 들어가지 않습니다.
Server Component에서 만들어진 `children`을 Client Component인 Provider가 **그대로 전달**하는 것이기 때문입니다.

---

## 10. 프론트엔드 코드 패턴

### 10-1. features 폴더 구조

기능 하나는 `features/{기능명}/` 아래에 `api`, `components`, `hooks`의 세 레이어로 구성됩니다.

```
features/board/
├── api/
│   ├── boardApi.ts       # axios 호출 함수
│   ├── boardEpicApi.ts
│   ├── boardTaskApi.ts
│   ├── queryKeys.ts      # React Query 키 팩토리
│   └── type.ts           # API 요청/응답 타입
├── components/
│   ├── BoardPage.tsx
│   ├── BoardPage.styles.ts   # 스타일 상수
│   ├── BoardKanban.tsx
│   └── ...
└── hooks/
    ├── useBoardQuery.ts  # useQuery 래퍼
    ├── useEpic.ts        # useMutation 래퍼
    └── useTask.ts
```

데이터 흐름:

```
컴포넌트 → hook → API 함수 → 서버 API Route → Repository → DB
```

### 10-2. API 함수 패턴

```ts
// features/board/api/boardApi.ts

// 조회 — 응답의 data 필드만 반환
export async function getBoardList(): Promise<EpicWithTasks[]> {
  const response = await axios.get<ListResponse<EpicWithTasks>>(API_PATHS.BOARD.LIST)
  return response.data.data
}

// 변경 — 반환값이 없을 때는 void
export async function moveTask({ id, status, priority }: TaskMoveParams): Promise<void> {
  await axios.patch(API_PATHS.BOARD.TASK_MOVE(id), { status, priority })
}
```

### 10-3. Query Key 팩토리 패턴

React Query의 캐시는 `queryKey` 배열로 구분됩니다.
Key를 함수로 관리하면 `invalidateQueries` 시 일관성을 유지할 수 있습니다.

```ts
// features/board/api/queryKeys.ts

export const boardKeys = {
  all: ['board'] as const,
  list: () => [...boardKeys.all, 'list'] as const,
  // 필요에 따라 확장 가능
  // detail: (id: number) => [...boardKeys.all, 'detail', id] as const,
}
```

```ts
// 조회 시
useQuery({ queryKey: boardKeys.list(), queryFn: getBoardList })

// 데이터 무효화 (재조회 트리거)
queryClient.invalidateQueries({ queryKey: boardKeys.list() })
```

### 10-4. useQuery / useMutation 훅 래퍼 패턴

React Query를 직접 컴포넌트에서 쓰지 않고, 기능별 훅으로 한 번 감쌉니다.
컴포넌트가 데이터 페칭 방법을 몰라도 되게 됩니다.

```ts
// features/board/hooks/useBoardQuery.ts

export function useBoardQuery() {
  return useQuery({
    queryKey: boardKeys.list(),
    queryFn: getBoardList,
  })
}
```

```ts
// features/board/hooks/useTask.ts

export function useTaskCreate(epicId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateTaskRequest) => createTask(epicId, params),
    onSuccess: () => {
      // 성공 후 보드 데이터 자동 재조회
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
```

컴포넌트에서는 훅만 호출합니다:

```tsx
// 컴포넌트 내부
const { data: epics = [], isLoading } = useBoardQuery()
const { mutate: createTask, isPending } = useTaskCreate(epicId)
```

### 10-5. 컴포넌트 + 스타일 분리 패턴

컴포넌트 파일(`.tsx`)과 스타일 파일(`.styles.ts`)을 항상 쌍으로 작성합니다.
스타일 파일에는 CVA 또는 Tailwind 클래스 문자열 상수를 정의합니다.

**CVA (class-variance-authority) — 컴포넌트 variant 관리:**

```ts
// components/button/BasicButton.styles.ts

export const buttonStyle = cva(
  // 기본 클래스 (모든 variant 공통)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary-100 text-secondary-700',
        danger: 'bg-danger-600 text-white hover:bg-danger-700',
        ghost: 'text-secondary-600 hover:bg-secondary-100',
        outline: 'border border-secondary-300 text-secondary-700',
      },
      size: {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
```

```tsx
// components/button/BasicButton.tsx

export default function BasicButton({ variant, size, className, ...props }: BasicButtonProps) {
  return <button className={buttonStyle({ variant, size, className })} {...props} />
}
```

사용:

```tsx
<BasicButton variant="primary" size="sm">저장</BasicButton>
<BasicButton variant="danger">삭제</BasicButton>
<BasicButton variant="ghost">취소</BasicButton>
```

**일반 스타일 상수 — 페이지 레이아웃:**

```ts
// features/board/components/BoardPage.styles.ts

export const boardPageStyles = {
  container: 'flex h-full overflow-hidden',
  content: 'flex-1 flex flex-col overflow-auto p-6',
  header: 'flex items-center justify-between mb-6',
  title: 'text-xl font-semibold text-secondary-100',
  empty: 'text-secondary-400 text-sm',
}
```

```tsx
// features/board/components/BoardPage.tsx

<div className={boardPageStyles.container}>
  <div className={boardPageStyles.content}>
    <div className={boardPageStyles.header}>
      <h1 className={boardPageStyles.title}>보드</h1>
    </div>
  </div>
</div>
```

### 10-6. Zustand 전역 상태 패턴

UI 상태(모달 열림/닫힘, 선택된 태스크 등)는 Zustand로 관리합니다.
`devtools` middleware를 사용하면 브라우저 Redux DevTools에서 상태 변화를 확인할 수 있습니다.

```ts
// stores/useBasicModalStore.ts

type BasicModalStore = {
  modal: BasicModalConfig | null
  openBasicModal: (config: BasicModalConfig) => void
  closeBasicModal: () => void
}

export const useBasicModalStore = create<BasicModalStore>()(
  devtools(
    (set) => ({
      modal: null,
      openBasicModal: (config) => set({ modal: config }, false, 'openBasicModal'),
      closeBasicModal: () => set({ modal: null }, false, 'closeBasicModal'),
    }),
    { name: 'BasicModalStore' },
  ),
)
```

컴포넌트에서:

```tsx
const { openBasicModal } = useBasicModalStore()

// 공지사항 클릭 시 모달 열기
openBasicModal({
  title: notice.title,
  children: <p>{notice.content}</p>,
})
```

### 10-7. 메시지 상수 중앙 관리

UI에 표시되는 텍스트는 `context/messages/` 폴더의 상수로 관리합니다.
컴포넌트에 한국어 문자열을 하드코딩하지 않습니다.

```ts
// context/messages/boardMsg.ts

export const BOARD_MSG = {
  PAGE_TITLE: '보드',
  EPIC_REGISTER: '에픽 등록',
  EPIC_UPDATE_SUCCESS: '에픽이 수정되었습니다.',
  EMPTY_EPICS: '등록된 에픽이 없습니다.',
} as const
```

```ts
// context/apiPaths.ts — API 경로도 마찬가지

export const API_PATHS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
  },
  BOARD: {
    LIST: '/api/board',
    TASK_MOVE: (id: number) => `/api/board/tasks/${id}`,
  },
} as const
```

---

## 11. 주요 기능 로직

### 11-1. 칸반 드래그 앤 드롭

**파일**: `features/board/components/BoardKanban.tsx`

`@dnd-kit/core`를 사용해 태스크를 칸반 컬럼 간에 드래그로 이동합니다.

**이벤트 흐름:**

```
[onDragStart]   → 드래그 시작: 원본 상태 저장 + DragOverlay 표시
[onDragOver]    → 드래그 중: UI 즉시 업데이트 (낙관적 UI)
[onDragEnd]     → 드래그 완료: priority 재계산 후 서버에 저장
[onDragCancel]  → 드래그 취소: 원본 상태로 복원
```

**Priority 재계산 로직:**

앞뒤 태스크의 priority 중간값을 새 priority로 사용합니다. 이 방식을 쓰면 매번 모든 태스크의 priority를 재정렬하지 않아도 됩니다.

```ts
function calcPriority(prev: BoardTask | undefined, next: BoardTask | undefined): number {
  if (!prev && next) return next.priority - 1000 // 맨 앞에 삽입
  if (prev && !next) return prev.priority + 1000 // 맨 뒤에 삽입
  if (prev && next) return Math.floor((prev.priority + next.priority) / 2) // 중간 삽입
  return 0
}
```

---

### 11-2. 타임라인 (Gantt)

**파일**: `features/timeline/`

Jira 스타일의 타임라인 뷰입니다. 왼쪽에 에픽/태스크 목록, 오른쪽에 월별 수평 그리드와 Gantt 바를 표시합니다.

**날짜 → 픽셀 변환** (`features/timeline/utils/timelineUtils.ts`):

```ts
// 현재 월 기준 12개월 전 ~ 24개월 후, 총 37개월 표시
const MONTH_WIDTH = 120 // 월당 픽셀 너비
const MONTHS_BEFORE = 12

// 날짜 문자열(YYYY-MM-DD) → 타임라인 내 X 픽셀 좌표
function dateToX(dateStr: string): number { ... }

// 에픽/태스크의 바 위치(left, width) 계산 — 범위 밖은 클리핑
function calcBarPosition(startDate, dueDate): { left: number; width: number } | null
```

**초기 스크롤**: 마운트 시 현재 월이 2번째 컬럼에 오도록 `scrollLeft`를 설정합니다.

**sticky 레이아웃**: 단일 스크롤 컨테이너에서 CSS sticky로 좌측 열(`sticky left-0`)과 헤더(`sticky top-0`)를 고정합니다.

**인라인 태스크 생성**: 드롭다운 "하위 작업 등록" 클릭 시 사이드 패널 대신 에픽 행 하단에 인라인 입력 UI를 표시합니다.

---

### 11-3. 권한 기반 UI 표시

`useAuth()` 훅으로 현재 사용자의 역할을 확인해 UI를 조건부 렌더링합니다.

```ts
// features/auth/hooks/useAuth.ts

export function useAuth() {
  const { data } = useSession()
  return { role: data?.role, isAdmin: data?.role === 'ADMIN' }
}
```

LNB 메뉴는 공통 메뉴(`COMMON_MENU_LIST`)와 어드민 전용 메뉴(`ADMIN_MENU_LIST`)로 분리됩니다.
`isAdmin`일 때만 구분선과 "관리자" 섹션 레이블을 추가해 어드민 메뉴를 렌더링합니다.

## 참고

### 기본 계정

| 아이디 | 비밀번호 | 권한  |
| ------ | -------- | ----- |
| admin  | admin123 | ADMIN |
