import { Proxy, Wallet } from '#/types/db.type'

export type IPCEvent =
  | Event<'app:ping'>
  | Event<'proxy:status', { id: number; status: Proxy['status'] }>
  | Event<'wallet:status', { id: number; status: Wallet['status'] }>

type Event<T extends string, D = undefined> = {
  data: D
  type: T
}
