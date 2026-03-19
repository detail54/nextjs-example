import path from 'path'
import BetterSqlite3 from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import * as schema from './schema'

const dbPath = path.join(process.cwd(), 'db.sqlite')

const sqlite = new BetterSqlite3(dbPath)

// SQLite 성능 설정
sqlite.pragma('journal_mode = WAL')

// 테이블 생성
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS epics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    start_date TEXT,
    due_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS epic_assignees (
    epic_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (epic_id, user_id),
    FOREIGN KEY (epic_id) REFERENCES epics(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    epic_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority INTEGER DEFAULT 0,
    start_date TEXT,
    due_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (epic_id) REFERENCES epics(id)
  );

  CREATE TABLE IF NOT EXISTS task_assignees (
    task_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned INTEGER DEFAULT 0 NOT NULL,
    is_published INTEGER DEFAULT 1 NOT NULL,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_epic_id ON tasks(epic_id);
  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
  CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

  CREATE INDEX IF NOT EXISTS idx_epics_status ON epics(status);
  CREATE INDEX IF NOT EXISTS idx_epics_due_date ON epics(due_date);
  
  CREATE INDEX IF NOT EXISTS idx_epic_assignees_epic_id ON epic_assignees(epic_id);
  CREATE INDEX IF NOT EXISTS idx_epic_assignees_user_id ON epic_assignees(user_id);
  CREATE INDEX IF NOT EXISTS idx_task_assignees_task_id ON task_assignees(task_id);
  CREATE INDEX IF NOT EXISTS idx_task_assignees_user_id ON task_assignees(user_id);

  CREATE INDEX IF NOT EXISTS idx_notices_author_id ON notices(author_id);
  CREATE INDEX IF NOT EXISTS idx_notices_is_pinned ON notices(is_pinned);
  CREATE INDEX IF NOT EXISTS idx_notices_is_published ON notices(is_published);
  CREATE INDEX IF NOT EXISTS idx_notices_published_at ON notices(published_at);
`)

// 기존 DB에 start_date 컬럼이 없을 경우 추가 (마이그레이션 대체)
try {
  sqlite.exec(`ALTER TABLE epics ADD COLUMN start_date TEXT`)
} catch {}
try {
  sqlite.exec(`ALTER TABLE tasks ADD COLUMN start_date TEXT`)
} catch {}

// 기존 DB에 color 컬럼이 없을 경우 추가 (마이그레이션 대체)
try {
  sqlite.exec(`ALTER TABLE epics ADD COLUMN color TEXT`)
} catch {}
try {
  sqlite.exec(`ALTER TABLE tasks ADD COLUMN color TEXT`)
} catch {}

export const db = drizzle(sqlite, { schema })

// admin 계정 초기 생성
let adminId: number | undefined = db
  .select({ id: schema.users.id })
  .from(schema.users)
  .where(eq(schema.users.username, 'admin'))
  .get()?.id

if (!adminId) {
  const hashed = bcrypt.hashSync('admin123', 10)
  const result = db
    .insert(schema.users)
    .values({ username: 'admin', password: hashed, role: 'ADMIN' })
    .run()
  adminId = Number(result.lastInsertRowid)
  console.log('✔ admin 계정 생성 (admin / admin123)')
}

// 기본 공지사항 생성 (공지가 하나도 없을 때)
const existingNotice = db.select({ id: schema.notices.id }).from(schema.notices).limit(1).get()

if (!existingNotice) {
  db.insert(schema.notices)
    .values([
      {
        authorId: adminId,
        title: '서비스 이용 안내',
        content:
          '안녕하세요.\n\n서비스를 이용해 주셔서 감사합니다.\n\n궁금한 사항이 있으시면 관리자에게 문의해 주세요.',
        isPinned: true,
        isPublished: true,
        createdAt: '2026-01-10 09:00:00',
        publishedAt: '2026-01-10 09:00:00',
      },
      {
        authorId: adminId,
        title: '시스템 점검 안내',
        content:
          '안녕하세요.\n\n서버 안정화를 위한 시스템 점검이 예정되어 있습니다.\n\n점검 중에는 서비스 이용이 일시적으로 제한될 수 있습니다.',
        isPinned: false,
        isPublished: true,
        createdAt: '2026-02-05 10:00:00',
        publishedAt: '2026-02-05 10:00:00',
      },
      {
        authorId: adminId,
        title: '신규 기능 업데이트 안내',
        content:
          '안녕하세요.\n\n새로운 기능이 추가되었습니다.\n\n보드 기능이 개선되었으며, 더욱 편리하게 업무를 관리하실 수 있습니다.',
        isPinned: false,
        isPublished: true,
        createdAt: '2026-03-01 11:00:00',
        publishedAt: '2026-03-01 11:00:00',
      },
    ])
    .run()
  console.log('✔ 기본 공지사항 생성')
}
