import { db } from '#/database'
import { TagInsert, TagUpdate } from '#/types/db.type'

export async function addTag(tag: TagInsert) {
  return db.insertInto('tag').values(tag).execute()
}

export async function deleteTag(id: number) {
  return db.deleteFrom('tag').where('id', '=', id).execute()
}

export async function getTags() {
  return db.selectFrom('tag').select(['id', 'color', 'text']).execute()
}

export async function updateTag(id: number, tag: TagUpdate) {
  return db
    .updateTable('tag')
    .set(tag)
    .where('id', '=', id)
    .returning(['id', 'color', 'text'])
    .executeTakeFirst()
}
