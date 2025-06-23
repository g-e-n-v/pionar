import { db } from '#/database'
import { ProxyInsert } from '#/types/db.type'

export async function addProxies(proxies: ProxyInsert[]) {
  return await db.insertInto('proxy').values(proxies).execute()
}

export async function getProxies() {
  return await db
    .selectFrom('proxy')
    .select(['id', 'host', 'port', 'username', 'password', 'status'])
    .execute()
}
