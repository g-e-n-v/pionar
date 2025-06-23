/* eslint-disable perfectionist/sort-modules */

import { DatabaseTables } from '#/types/db.type'
import { Kysely, sql } from 'kysely'

async function up(db: Kysely<DatabaseTables>) {
  await createTableWithBaseColumns(db, 'tag')
    .addColumn('text', 'text', (col) => col.notNull())
    .addColumn('color', 'text', (col) => col.defaultTo(null))
    .execute()

  await createTableWithBaseColumns(db, 'proxy')
    .addColumn('host', 'text', (col) => col.notNull())
    .addColumn('port', 'integer', (col) => col.notNull())
    .addColumn('username', 'text', (col) => col.notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .addColumn('status', 'text', (col) => col.notNull().defaultTo('no-verified'))
    .execute()
}

async function down(db: Kysely<DatabaseTables>) {
  await db.schema.dropTable('proxy').ifExists().execute()
}

export const migration_000_init_schema = { down, up }

// -------------------
function createTableWithBaseColumns(db: Kysely<DatabaseTables>, tableName: string) {
  return db.schema
    .createTable(tableName)
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('createdAt', 'datetime', (col) => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updatedAt', 'datetime', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('deletedAt', 'datetime', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
}
