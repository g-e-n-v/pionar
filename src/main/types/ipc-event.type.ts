import { ProxySelect, WalletSelect } from '#/types/db.type'

export type IPCEvent =
  | Event<'app:ping'>
  | Event<'proxy:status', { id: number; status: ProxySelect['status'] }>
  | Event<'wallet:status', { id: number; status: WalletSelect['status'] }>

type Event<T extends string, D = undefined> = {
  data: D
  type: T
}
