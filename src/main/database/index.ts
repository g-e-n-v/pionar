import { DATABASE_PATH } from '#/constants/db.constant'
import { migration_000_init_schema } from '#/database/migrations/000-init-schema'
import { DatabaseTables } from '#/types/db.type'
import Database from 'better-sqlite3'
import { Kysely, Migration, Migrator, SqliteDialect } from 'kysely'

const sqlite = new Database(DATABASE_PATH)
sqlite.pragma('foreign_keys = ON')

export const db = new Kysely<DatabaseTables>({
  dialect: new SqliteDialect({ database: sqlite }),
  log: ['error', 'query']
  // log: ['error']
})

export const migrator = new Migrator({
  db,
  migrationLockTableName: 'migrations_lock',
  migrationTableName: 'migrations',
  provider: { getMigrations }
})

export async function getMigrations() {
  const migrations: Record<string, Migration> = {
    migration_000_init_schema
  }

  return migrations
}

export async function initializeDatabase() {
  if (sqlite.exec('SELECT 1')) {
    console.log('Database connected', DATABASE_PATH)
  }

  await migrator.migrateToLatest()
}

export async function resetDatabase() {
  await migrator.migrateDown()
  await migrator.migrateToLatest()
}
