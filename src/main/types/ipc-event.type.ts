import { ProxySelect, WalletSelect } from '#/types/db.type'

export type IPCEvent =
  | Event<'app:ping'>
  | Event<'proxy:status', { id: number; status: ProxySelect['status'] }>
  | Event<'wallet:lock-count', { id: number; lockCount: number }>
  | Event<'wallet:status', { id: number; status: WalletSelect['status'] }>

export type IPCInput<T extends IPCEvent['type']> = Extract<IPCEvent, { type: T }>['data']

type Event<T extends string, D = undefined> = {
  data: D
  type: T
}
