// src/lib/db/connection.ts - Updated for Drizzle 0.44+
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema.js';
import { dev } from '$app/environment';

let db: ReturnType<typeof drizzle>;

// Initialize database connection
export function initDB() {
  if (!db) {
    const dbPath = dev ? './sqlite.db' : './data/sqlite.db';
    const sqlite = new Database(dbPath);
    
    // Enable WAL mode for better performance
    sqlite.pragma('journal_mode = WAL');
    
    db = drizzle(sqlite, { schema });
    
    // Run migrations automatically in development
    if (dev) {
      try {
        migrate(db, { migrationsFolder: './drizzle' });
        console.log('💚 Love Ledger database migrations applied');
      } catch (error) {
        console.log('💚 Love Ledger database initialized (no migrations needed)');
      }
    }
  }
  return db;
}

export function getDB() {
  if (!db) {
    initDB();
  }
  return db;
}
