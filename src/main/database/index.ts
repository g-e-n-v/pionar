import { DATABASE_PATH } from '#/constants/db.constant'
import { DatabaseTables } from '#/types/db.type'
import Database from 'better-sqlite3'
import { Kysely, Migration, Migrator, SqliteDialect } from 'kysely'

const sqlite = new Database(DATABASE_PATH)
sqlite.pragma('foreign_keys = ON')

export const db = new Kysely<DatabaseTables>({
  dialect: new SqliteDialect({ database: sqlite }),
  log: ['query', 'error']
})

export async function getMigrations() {
  const migrations: Record<string, Migration> = {}

  return migrations
}

export async function loadDatabase() {
  const migrator = new Migrator({
    db,
    migrationLockTableName: 'migrations_lock',
    migrationTableName: 'migrations',
    provider: { getMigrations }
  })

  await migrator.migrateToLatest()
}
