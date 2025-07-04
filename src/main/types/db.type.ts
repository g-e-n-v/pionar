import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export type BaseEntity<T = Record<string, unknown>> = T & {
  createdAt: Generated<string>
  deletedAt: null | string
  id: Generated<number>
  updatedAt: null | string
}

export type DatabaseTables = {
  junctionWalletTag: JunctionWalletTag
  lock: Lock
  proxy: Proxy
  tag: Tag
  wallet: Wallet
}
export type JunctionWalletTag = BaseEntity<{
  tagId: number
  walletId: number
}>
export type JunctionWalletTagInsert = Insertable<JunctionWalletTag>
export type JunctionWalletTagSelect = Selectable<JunctionWalletTag>
export type JunctionWalletTagUpdate = Updateable<JunctionWalletTag>

export type Lock = BaseEntity<{
  amount: number
  unlockAt: string
  walletId: number
}>
export type LockInsert = Insertable<Lock>
export type LockSelect = Selectable<Lock>
export type LockUpdate = Updateable<Lock>

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
  error: null | string
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

export type WalletUpdate = Updateable<Wallet>
