import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type BaseEntity<T = Record<string, unknown>> = T & {
  createdAt: Generated<Date>
  deletedAt: Date | null
  id: Generated<number>
  updatedAt: Date | null
}

export type JunctionWalletTag = BaseEntity<{
  tagId: number
  walletId: number
}>
export type JunctionWalletTagInsert = Insertable<JunctionWalletTag>
export type JunctionWalletTagSelect = Selectable<JunctionWalletTag>
export type JunctionWalletTagUpdate = Updateable<JunctionWalletTag>

export type Proxy = BaseEntity<{
  host: string
  note: null | string
  password: string
  port: number
  status: 'active' | 'inactive' | 'processing'
  username: string
}>
export type ProxyInsert = Insertable<Proxy>
export type ProxySelect = Selectable<Proxy>
export type ProxyUpdate = Updateable<Proxy>

export type Tag = BaseEntity<{
  color: null | string
  text: string
}>
export type TagInsert = Insertable<Tag>
export type TagSelect = Selectable<Tag>
export type TagUpdate = Updateable<Tag>

export type Wallet = BaseEntity<{
  mnemonic: string
  nativeBalance: number
  numSponsored: number
  numSponsoring: number
  privateKey: string
  publicKey: string
  subentryCount: number
}>
export type WalletInsert = Insertable<Wallet>
export type WalletSelect = Selectable<Wallet>
export type WalletUpdate = Updateable<Wallet> & {
  privateKey: string
}

// eslint-disable-next-line perfectionist/sort-modules
export type DatabaseTables = {
  proxy: Proxy
  tag: Tag
}
