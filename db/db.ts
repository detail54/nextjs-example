import path from 'path'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

const dbPath = path.join(process.cwd(), 'db.sqlite')

export const db = new Database(dbPath)

// SQLite 설정 (성능 관련)
db.pragma('journal_mode = WAL')

// epics 테이블 생성
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'USER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE epics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE tasks (
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
`)

// 인덱스 (조회 성능)
db.exec(`
  CREATE INDEX idx_tasks_epic_id ON tasks(epic_id);
  CREATE INDEX idx_tasks_status ON tasks(status);
`)

// admin 계정 생성
const admin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin')

if (!admin) {
  const hashed = bcrypt.hashSync('admin123', 10)

  db.prepare(
    `
    INSERT INTO users (username, password, role)
    VALUES (?, ?, ?)
  `,
  ).run('admin', hashed, 'ADMIN')

  console.log('✔ admin 계정 생성 (admin / admin123)')
}
