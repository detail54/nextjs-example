import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// 사용자 테이블
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 사용자 고유 ID (자동 증가)
  username: text('username').notNull().unique(), // 로그인 아이디 (중복 불가)
  password: text('password').notNull(), // 해시된 비밀번호
  role: text('role', { enum: ['USER', 'ADMIN'] }) // 권한: 일반 사용자 / 관리자
    .default('USER')
    .notNull(),
  createdAt: text('created_at') // 계정 생성일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// 에픽 테이블 (대분류 작업 단위)
export const epics = sqliteTable('epics', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 에픽 고유 ID (자동 증가)
  title: text('title').notNull(), // 에픽 제목
  description: text('description'), // 에픽 설명 (선택)
  status: text('status', { enum: ['active', 'inactive', 'completed'] }) // 진행 상태: 진행중 / 비활성 / 완료
    .default('active')
    .notNull(),
  startDate: text('start_date'), // 시작일 (선택, ISO 8601 문자열)
  dueDate: text('due_date'), // 마감일 (선택, ISO 8601 문자열)
  createdAt: text('created_at') // 생성일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at') // 수정일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// 에픽 담당자 중간 테이블 (epic : user = N : M)
export const epicAssignees = sqliteTable('epic_assignees', {
  epicId: integer('epic_id') // 참조 에픽 ID
    .notNull()
    .references(() => epics.id),
  userId: integer('user_id') // 참조 사용자 ID
    .notNull()
    .references(() => users.id),
})

// 태스크 테이블 (에픽 하위 작업 단위)
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 태스크 고유 ID (자동 증가)
  epicId: integer('epic_id') // 소속 에픽 ID
    .notNull()
    .references(() => epics.id),
  title: text('title').notNull(), // 태스크 제목
  description: text('description'), // 태스크 설명 (선택)
  status: text('status', { enum: ['todo', 'in_progress', 'done'] }) // 진행 상태: 대기 / 진행중 / 완료
    .default('todo')
    .notNull(),
  priority: integer('priority').default(0).notNull(), // 우선순위 (숫자가 클수록 높음)
  startDate: text('start_date'), // 시작일 (선택, ISO 8601 문자열)
  dueDate: text('due_date'), // 마감일 (선택, ISO 8601 문자열)
  createdAt: text('created_at') // 생성일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at') // 수정일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// 태스크 담당자 중간 테이블 (task : user = N : M)
export const taskAssignees = sqliteTable('task_assignees', {
  taskId: integer('task_id') // 참조 태스크 ID
    .notNull()
    .references(() => tasks.id),
  userId: integer('user_id') // 참조 사용자 ID
    .notNull()
    .references(() => users.id),
})

// 공지사항 테이블
export const notices = sqliteTable('notices', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 공지 고유 ID (자동 증가)
  authorId: integer('author_id') // 작성자 사용자 ID
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(), // 공지 제목
  content: text('content').notNull(), // 공지 본문
  isPinned: integer('is_pinned', { mode: 'boolean' }).default(false).notNull(), // 상단 고정 여부
  isPublished: integer('is_published', { mode: 'boolean' }).default(true).notNull(), // 게시 여부
  publishedAt: text('published_at') // 게시일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text('created_at') // 생성일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at') // 수정일시
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
