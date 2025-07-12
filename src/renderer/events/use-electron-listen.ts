import { IPCEvent } from '#/types/ipc-event.type'
import { useEffect } from 'react'

export function useElectronListen<T extends IPCEvent['type']>(
  type: T,
  callback: (event: Extract<IPCEvent, { type: T }>['data']) => void
) {
  // @ts-ignore safe
  useEffect(() => window.electron.on(type, callback), [callback, type])
}
