# Noto

Next.js App Router 기반의 풀스택 프로젝트입니다.
프론트엔드(React)와 백엔드(API Routes)를 하나의 저장소에서 관리합니다.

---

## 목차

1. [기술 스택](#1-기술-스택)
2. [시작하기](#2-시작하기)
3. [폴더 구조](#3-폴더-구조)
4. [데이터베이스 구조](#4-데이터베이스-구조)
5. [코드 컨벤션](#5-코드-컨벤션)
6. [미구현 페이지](#6-미구현-페이지)

---

## 1. 기술 스택

### 프론트엔드

| 라이브러리                     | 용도                              |
| ------------------------------ | ---------------------------- |
| Next.js 16 (App Router)        | 풀스택 프레임워크            |
| TailwindCSS 4                  | 스타일링                     |
| class-variance-authority (CVA) | 컴포넌트 variant 스타일 관리 |
| TanStack React Query 5         | 서버 상태 관리               |
| Zustand 5                      | 클라이언트 전역 상태 관리    |
| Axios                          | HTTP 클라이언트              |
| dnd-kit                        | 드래그 앤 드롭               |
| Sonner                         | 토스트 알림                  |
| Lucide React                   | 아이콘                       |

### 백엔드

| 라이브러리     | 용도                 |
| -------------- | -------------------- |
| better-sqlite3 | SQLite 드라이버      |
| Drizzle ORM    | TypeScript-first ORM |
| jose           | JWT 발급 / 검증      |
| bcryptjs       | 비밀번호 해싱        |

---

## 2. 시작하기

### 환경 변수 설정

`.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.example .env.local
```

```env
ACCESS_TOKEN_SECRET=<랜덤 문자열>
ACCESS_TOKEN_COOKIE_NAME=access_token

REFRESH_TOKEN_SECRET=<랜덤 문자열>
REFRESH_TOKEN_COOKIE_NAME=refresh_token
```

```bash
# 랜덤 문자열 생성
openssl rand -base64 32
```

### 설치 및 실행

```bash
pnpm install
pnpm dev
```

서버가 처음 시작되면 `db.sqlite` 생성, 테이블 생성, 기본 계정 및 샘플 공지사항이 자동으로 초기화됩니다.

**기본 계정**

| 아이디 | 비밀번호 | 권한  |
| ------ | -------- | ----- |
| admin  | admin123 | ADMIN |

---

## 3. 폴더 구조

```
noto/
│
├── app/                              # Next.js App Router (라우팅만 담당)
│   ├── (main)/                       # 인증 후 메인 레이아웃 그룹
│   │   ├── layout.tsx                # LNB + 콘텐츠 + 사이드 패널 레이아웃
│   │   ├── board/page.tsx
│   │   ├── notice-manage/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   └── ...                       # timeline, notice, calendar, user-manage, my-page
│   │
│   ├── api/                          # Route Handlers (백엔드 API)
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── refresh/route.ts
│   │   ├── board/
│   │   │   ├── route.ts              # 전체 보드 조회
│   │   │   ├── epics/[epicId]/route.ts
│   │   │   ├── epics/[epicId]/tasks/route.ts
│   │   │   └── tasks/[id]/route.ts
│   │   ├── notice/route.ts
│   │   ├── notice-manage/
│   │   │   ├── route.ts              # 목록 조회 + 등록 (ADMIN)
│   │   │   └── [id]/route.ts         # 단건 조회 + 수정 + 삭제 (ADMIN)
│   │   └── users/
│   │       ├── route.ts              # 사용자 목록 조회 (ADMIN)
│   │       ├── [id]/role/route.ts    # 역할 변경 (ADMIN)
│   │       ├── me/route.ts           # 내 프로필 조회
│   │       ├── me/email/route.ts     # 이메일 변경
│   │       └── me/password/route.ts  # 비밀번호 변경
│   │
│   ├── auth/login/page.tsx
│   ├── login-required/page.tsx
│   ├── session-expired/page.tsx
│   ├── unauthorized/page.tsx
│   ├── layout.tsx                    # 루트 레이아웃 (Providers, Toaster)
│   └── page.tsx
│
├── layouts/
│   └── lnb/                          # 사이드 내비게이션 (Lnb, LnbMenuItem)
│
├── features/                         # 기능별 모듈 (프론트엔드의 핵심)
│   ├── common/
│   │   ├── api/                      # 에픽/태스크 공통 API (보드·타임라인 공유)
│   │   └── components/               # EpicSidePanel, TaskSidePanel
│   ├── notice-manage/
│   │   ├── api/                      # noticeManageApi, queryKeys, type
│   │   ├── components/               # NoticeManagePage, NoticeManageForm, ...
│   │   ├── hooks/                    # useNoticeManageQuery, useNoticeCreate, ...
│   │   └── utils/                    # 해당 feature의 utill
│   └── ...                           # my-page, auth, notice, user-manage 동일 구조 (api, components, hooks)
├── components/                       # 공용 UI 컴포넌트 (기능 무관 범용 프리미티브)
│   ├── button/                       # BasicButton, IconButton, LinkButton, TextButton
│   └── .../
│
├── server/                           # 서버 전용 코드 (브라우저에서 실행 안 됨)
│   ├── core/
│   │   ├── db/
│   │   │   ├── db.ts                 # DB 연결 + 테이블 생성 + 초기 데이터
│   │   │   ├── schema.ts             # Drizzle 스키마 정의
│   │   │   └── type.ts               # DB row 타입 + Response 공용 타입
│   │   ├── lib/
│   │   │   ├── withLogger.ts         # 요청/응답 로깅 미들웨어
│   │   │   └── logger.ts             # 콘솔 로거
│   │   ├── messages/
│   │   │   └── httpStatus.ts         # HTTP 상태 메시지 상수
│   │   └── type.ts                   # 공용 서버 타입
│   ├── auth/
│   │   ├── auth.repository.ts
│   │   ├── auth.service.ts
│   │   ├── auth.message.ts           # 서버 응답 메시지 상수
│   │   ├── authenticate.ts           # 인증/권한 검사 유틸
│   │   ├── authError.ts              # 인증 커스텀 에러 클래스
│   │   ├── jwt.ts                    # JWT 발급/검증
│   │   ├── type.ts
│   │   └── withAuth.ts               # 인증 미들웨어 (route 래퍼)
│   ├── epics/
│   │   ├── epic.repository.ts
│   │   ├── epic.service.ts
│   │   ├── epic.message.ts
│   │   └── type.ts
│   └── ...                           # notices, tasks, users 동일 구조
│
├── stores/                           # Zustand 전역 상태
│   ├── useBasicModalStore.ts
│   ├── useConfirmModalStore.ts
│   └── ...                           # useEpicPanelStore, useTaskPanelStore
│
├── context/                          # 앱 전체 상수/설정
│   ├── apiPaths.ts                   # API 경로 상수
│   ├── appPaths.ts                   # 페이지 경로 상수
│   ├── constants.ts                  # 도메인 상수 (TASK_STATUS, EPIC_STATUS 등)
│   ├── menuConfig.ts                 # LNB 메뉴 설정
│   ├── pageTitles.ts                 # 페이지 제목 메타데이터
│   └── messages/                     # 기능별 UI 메시지 상수 (boardMsg.ts 등)
│
├── lib/
│   ├── Providers.tsx                 # QueryClientProvider + ModalProvider 래퍼
│   └── queryClient.ts                # QueryClient 설정
│
└── db.sqlite                         # SQLite 데이터베이스 파일 (자동 생성)
```

### app/ vs features/ 분리 원칙

`app/` 폴더의 `page.tsx`는 라우팅만 담당합니다. 실제 UI 로직은 `features/` 안의 컴포넌트에 위임합니다.

```tsx
// app/(main)/board/page.tsx
import BoardPage from '@/features/board/components/BoardPage'
export default function Page() {
  return <BoardPage />
}
```

---

## 4. 데이터베이스 구조

SQLite + Drizzle ORM을 사용합니다. 스키마는 `server/core/db/schema.ts`에 정의합니다.

### ERD

```
users
 ├─< epic_assignees >─ epics ─< tasks >─< task_assignees >─ users
 └─< notices (author_id)
```

### 테이블

| 테이블           | 설명                                                                   |
| ---------------- | ---------------------------------------------------------------------- |
| `users`          | 사용자 (id, username, password, role, created_at)                      |
| `epics`          | 에픽 (id, title, description, status, due_date, ...)                   |
| `tasks`          | 태스크 (id, epic_id, title, status, priority, due_date, ...)           |
| `epic_assignees` | 에픽 담당자 N:M 중간 테이블                                            |
| `task_assignees` | 태스크 담당자 N:M 중간 테이블                                          |
| `notices`        | 공지사항 (id, author_id, title, content, is_pinned, is_published, ...) |

> **priority 설계**: 칸반 드래그 재정렬 시 앞뒤 태스크의 중간값을 사용합니다.
> 예) 앞 1000, 뒤 2000이면 삽입 태스크는 1500.

---

## 5. 코드 컨벤션

### 공통

- DB: `snake_case` / API 응답 및 프론트엔드: `camelCase`
- 문구 하드코딩 금지 — `context/messages/` 파일에서 관리
- API 경로는 `context/apiPaths.ts`, 페이지 경로는 `context/appPaths.ts`에 정의

### 백엔드

- 인증 필요 API → `withAuth()` 래퍼 사용
- ADMIN 전용 → `withAuth(handler, { roles: ['ADMIN'] })`
- 모든 응답은 `BasicResponse<T>` / `ListResponse<T>` / `PageResponse<T>` 중 하나
- SQL은 Repository에서만 작성, Service에서 비즈니스 로직 처리
- 서버 메시지 상수는 각 도메인 폴더의 `*.message.ts`에 정의

### 프론트엔드

- 서버 상태: TanStack Query (`useQuery` / `useMutation`)
- 클라이언트 상태: Zustand
- 페이지네이션 목록에서 create/delete 시 → `lists()` 전체 invalidate
- 페이지네이션 목록에서 update 시 → 해당 페이지 쿼리키만 invalidate
- 컴포넌트 파일(`.tsx`)과 스타일 파일(`.styles.ts`) 항상 쌍으로 작성
- API 데이터를 표시하는 컴포넌트는 스켈레톤 필수

### 테마

- 색상 토큰은 `app/globals.css`의 `@theme` 블록에서 CSS 변수로 정의
- 테마별 오버라이드는 `[data-theme='...']` 셀렉터로 CSS 변수 재정의
- 현재 지원 테마: `dark` (기본) / `vintage` (웜 세피아 + 테라코타)
- 테마 상태: `stores/useThemeStore.ts` (Zustand persist, `localStorage` 저장)
- 새 테마 추가 시 `globals.css`에 오버라이드 블록만 추가하면 됨
