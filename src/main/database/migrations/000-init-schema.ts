/* eslint-disable perfectionist/sort-modules */

import { DatabaseTables } from '#/types/db.type'
import { Kysely, sql } from 'kysely'

async function up(db: Kysely<DatabaseTables>) {
  await createTableWithBaseColumns(db, 'tag')
    .addColumn('text', 'text', (col) => col.notNull())
    .addColumn('color', 'text', (col) => col.defaultTo('#6b7280'))
    .execute()

  await createTableWithBaseColumns(db, 'proxy')
    .addColumn('host', 'text', (col) => col.notNull())
    .addColumn('port', 'integer', (col) => col.notNull())
    .addColumn('username', 'text', (col) => col.notNull())
    .addColumn('password', 'text', (col) => col.notNull())
    .addColumn('status', 'text', (col) => col.notNull().defaultTo('not-verified'))
    .addColumn('note', 'text')
    .addUniqueConstraint('unique_proxy', ['host', 'port'])
    .execute()

  await createTableWithBaseColumns(db, 'wallet')
    .addColumn('mnemonic', 'text', (col) => col.notNull().unique())
    .addColumn('privateKey', 'text', (col) => col.notNull())
    .addColumn('publicKey', 'text', (col) => col.notNull())
    .addColumn('subentryCount', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('numSponsoring', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('numSponsored', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('nativeBalance', 'integer')
    .addColumn('error', 'text')
    .addColumn('status', 'text', (col) => col.notNull().defaultTo('not_started'))
    .execute()

  await createTableWithBaseColumns(db, 'junctionWalletTag')
    .addColumn('tagId', 'integer', (col) => col.references('tag.id').onDelete('cascade'))
    .addColumn('walletId', 'integer', (col) => col.references('wallet.id').onDelete('cascade'))
    .execute()

  await createTableWithBaseColumns(db, 'lock')
    .addColumn('amount', 'integer', (col) => col.notNull())
    .addColumn('unlockAt', 'datetime', (col) => col.notNull())
    .addColumn('walletId', 'integer', (col) => col.references('wallet.id').onDelete('cascade'))
    .addColumn('balanceId', 'text', (col) => col.notNull().unique())
    .execute()
}

async function down(db: Kysely<DatabaseTables>) {
  await db.schema.dropTable('junctionWalletTag').ifExists().execute()
  await db.schema.dropTable('lock').ifExists().execute()
  await db.schema.dropTable('wallet').ifExists().execute()
  await db.schema.dropTable('proxy').ifExists().execute()
  await db.schema.dropTable('tag').ifExists().execute()
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
