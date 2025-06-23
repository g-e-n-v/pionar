import { Generated, Insertable, Updateable } from 'kysely'

export type BaseEntity<T = Record<string, unknown>> = T & {
  createdAt: Generated<Date>
  deletedAt: Date | null
  id: Generated<number>
  updatedAt: Date | null
}

export type Proxy = BaseEntity<{
  host: string
  password: string
  port: number
  status: 'dead' | 'live' | 'no-verified'
  username: string
}>
export type ProxyInsert = Insertable<Proxy>
export type ProxyUpdate = Updateable<Proxy>

export type Tag = BaseEntity<{
  color: null | string
  text: string
}>
export type TagInsert = Insertable<Tag>
export type TagUpdate = Updateable<Tag>

// eslint-disable-next-line perfectionist/sort-modules
export type DatabaseTables = {
  proxy: Proxy
}
