import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'PortfolioDB.sqlite');
const SQL_EXPORT_FILE = path.join(__dirname, 'PortfolioDB.sql');

let sqlDb = null;
let SQL = null;

export async function initSqliteDb() {
  if (sqlDb) return sqlDb;

  SQL = await initSqlJs();

  if (fs.existsSync(DB_FILE)) {
    try {
      const fileBuffer = fs.readFileSync(DB_FILE);
      sqlDb = new SQL.Database(fileBuffer);
      console.log('✅ Loaded existing SQLite database: PortfolioDB.sqlite');
    } catch (e) {
      console.warn('Failed to load existing SQLite file, creating fresh DB:', e);
      sqlDb = new SQL.Database();
    }
  } else {
    sqlDb = new SQL.Database();
    console.log('✨ Created new SQLite database: PortfolioDB.sqlite');
  }

  // Run initial schema & foreign keys
  sqlDb.run('PRAGMA foreign_keys = ON;');
  runMigrations(sqlDb);
  saveSqliteDb();
  exportSqlDump();

  return sqlDb;
}

function runMigrations(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS Categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Projects (
      projectID INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      categoryId INTEGER,
      category TEXT NOT NULL,
      technalogy TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Published',
      gitHub TEXT,
      liveDemo TEXT,
      image TEXT,
      featured INTEGER DEFAULT 0,
      createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES Categories (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS Skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      categoryId INTEGER,
      category TEXT NOT NULL,
      icon TEXT NOT NULL,
      level TEXT NOT NULL DEFAULT 'Advanced',
      proficiency INTEGER DEFAULT 85,
      status TEXT DEFAULT 'Published',
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES Categories (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS Courses (
      courseID INTEGER PRIMARY KEY AUTOINCREMENT,
      courseName TEXT NOT NULL,
      priceType TEXT DEFAULT 'paid',
      price TEXT DEFAULT 'PKR 3,500',
      originalPrice TEXT DEFAULT 'PKR 6,000',
      platform TEXT NOT NULL,
      instructor TEXT NOT NULL,
      categoryId INTEGER,
      category TEXT NOT NULL,
      technology TEXT NOT NULL,
      level TEXT NOT NULL DEFAULT 'Beginner',
      duration TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Completed',
      courseUrl TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (categoryId) REFERENCES Categories (id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS Messages (
      messageID INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      messageText TEXT,
      isStarred INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Unread',
      replied INTEGER DEFAULT 0,
      createdDate DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      courseID INTEGER,
      studentName TEXT NOT NULL,
      studentEmail TEXT NOT NULL,
      studentPhone TEXT,
      courseName TEXT NOT NULL,
      paymentMethod TEXT DEFAULT 'JazzCash',
      transactionId TEXT NOT NULL,
      amountPaid TEXT DEFAULT 'PKR 3,500',
      screenshotProof TEXT,
      status TEXT DEFAULT 'Pending Approval',
      accessKey TEXT,
      portalUrl TEXT,
      adminNotes TEXT,
      submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      approvedAt DATETIME,
      FOREIGN KEY (courseID) REFERENCES Courses (courseID) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS PaymentAccounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      method TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      accountTitle TEXT NOT NULL,
      accountNumber TEXT NOT NULL,
      iban TEXT,
      bankName TEXT,
      instructions TEXT,
      icon TEXT,
      isActive INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT,
      avatar TEXT,
      phone TEXT,
      location TEXT,
      github TEXT,
      linkedin TEXT,
      twitter TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function saveSqliteDb() {
  if (!sqlDb) return;
  try {
    const data = sqlDb.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.error('Failed to save SQLite file:', err);
  }
}

export function executeSql(sql, params = []) {
  if (!sqlDb) return [];
  try {
    const stmt = sqlDb.prepare(sql);
    if (params && params.length) {
      stmt.bind(params);
    }
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (err) {
    console.error('SQL Execution Error for:', sql, err);
    return [];
  }
}

export function runSqlCommand(sql, params = []) {
  if (!sqlDb) return false;
  try {
    sqlDb.run(sql, params);
    saveSqliteDb();
    exportSqlDump();
    return true;
  } catch (err) {
    console.error('SQL Run Error for:', sql, err);
    return false;
  }
}

export function exportSqlDump() {
  if (!sqlDb) return;
  try {
    let sqlDump = `-- ========================================================\n`;
    sqlDump += `-- PortfolioDB - Relational SQL Database Schema & Data Dump\n`;
    sqlDump += `-- Generated: ${new Date().toISOString()}\n`;
    sqlDump += `-- Database: PortfolioDB\n`;
    sqlDump += `-- ========================================================\n\n`;

    const tables = ['Categories', 'Projects', 'Skills', 'Courses', 'Messages', 'Enrollments', 'PaymentAccounts', 'Admin', 'Settings'];

    tables.forEach(tableName => {
      try {
        const rows = executeSql(`SELECT * FROM ${tableName}`);
        sqlDump += `-- Table: ${tableName} (${rows.length} records)\n`;
        if (rows.length > 0) {
          const keys = Object.keys(rows[0]);
          rows.forEach(r => {
            const vals = keys.map(k => {
              const v = r[k];
              if (v === null || v === undefined) return 'NULL';
              if (typeof v === 'number') return v;
              return `'${String(v).replace(/'/g, "''")}'`;
            });
            sqlDump += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${vals.join(', ')});\n`;
          });
        }
        sqlDump += `\n`;
      } catch (e) {
        // Table might be empty
      }
    });

    fs.writeFileSync(SQL_EXPORT_FILE, sqlDump, 'utf-8');
  } catch (e) {
    console.warn('Failed to export SQL dump:', e);
  }
}

export { sqlDb };
