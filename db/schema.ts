import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// users 테이블 스키마
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['USER', 'ADMIN'] })
    .default('USER')
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// epics 테이블 스키마
export const epics = sqliteTable('epics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['active', 'inactive', 'completed'] })
    .default('active')
    .notNull(),
  dueDate: text('due_date'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// epic 담당자 중간 테이블 (epic : user = N : M)
export const epicAssignees = sqliteTable('epic_assignees', {
  epicId: integer('epic_id')
    .notNull()
    .references(() => epics.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

// tasks 테이블 스키마
export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  epicId: integer('epic_id')
    .notNull()
    .references(() => epics.id),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['todo', 'in_progress', 'done'] })
    .default('todo')
    .notNull(),
  priority: integer('priority').default(0).notNull(),
  dueDate: text('due_date'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

// task 담당자 중간 테이블 (task : user = N : M)
export const taskAssignees = sqliteTable('task_assignees', {
  taskId: integer('task_id')
    .notNull()
    .references(() => tasks.id),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
})

// notices 테이블 스키마
export const notices = sqliteTable('notices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  isPinned: integer('is_pinned', { mode: 'boolean' }).default(false).notNull(),
  isPublished: integer('is_published', { mode: 'boolean' }).default(true).notNull(),
  publishedAt: text('published_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})
