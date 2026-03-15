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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    epic_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    priority INTEGER DEFAULT 0,
    due_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (epic_id) REFERENCES epics(id)
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_epic_id ON tasks(epic_id);
  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
`)

export const db = drizzle(sqlite, { schema })

// admin 계정 초기 생성
const admin = db.select({ id: schema.users.id })
  .from(schema.users)
  .where(eq(schema.users.username, 'admin'))
  .get()

if (!admin) {
  const hashed = bcrypt.hashSync('admin123', 10)
  db.insert(schema.users)
    .values({ username: 'admin', password: hashed, role: 'ADMIN' })
    .run()
  console.log('✔ admin 계정 생성 (admin / admin123)')
}
