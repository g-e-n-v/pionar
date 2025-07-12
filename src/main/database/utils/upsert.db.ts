import { db } from '#/database'
import { DatabaseTables } from '#/types/db.type'
import { AnyColumn, Insertable } from 'kysely'

export async function upsert<
  Table extends keyof DatabaseTables,
  Row extends Insertable<DatabaseTables[Table]>,
  ConflictColumn extends keyof Row
>(table: Table, data: Row, conflictColumn: ConflictColumn) {
  const updateColumns = Object.keys(data).filter((col) => col !== conflictColumn) as (keyof Row)[]

  await db
    .insertInto(table)
    .values(data)
    .onConflict((oc) =>
      oc
        .column(conflictColumn as AnyColumn<DatabaseTables, Table>)
        // @ts-ignore — skip check type for eb.ref
        .doUpdateSet((eb) => Object.fromEntries(updateColumns.map((col) => [col, eb.ref(col)])))
    )
    .execute()

  const result = await db
    .selectFrom(table)
    // @ts-ignore — safe for this context
    .select(['id'])
    .where(conflictColumn, '=', data[conflictColumn])
    .executeTakeFirstOrThrow()

  return result.id as { id: number }
}
