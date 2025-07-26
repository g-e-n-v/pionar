/* eslint-disable perfectionist/sort-object-types */
import { resetDatabase } from '#/database'
import { getLocks, refreshLock } from '#/handlers/locks.hanlder'
import { addProxies, deleteProxies, getProxies, verifyProxies } from '#/handlers/proxies.handler'
import { addTag, deleteTag, getTags, updateTag } from '#/handlers/tags.handler'
import { addWallets, collectFunds, getWallets, refreshWallets } from '#/handlers/wallets.handler'
import { IPCEvent } from '#/types/ipc-event.type'
import { ElectronAPI } from '@electron-toolkit/preload'

type Fn<Input, Output = void> = (args: Input) => Output

declare global {
  interface Window {
    api: {
      resetDatabase: typeof resetDatabase

      addTag: typeof addTag
      getTags: typeof getTags
      updateTag: typeof updateTag
      deleteTag: typeof deleteTag

      addProxies: typeof addProxies
      getProxies: typeof getProxies
      verifyProxies: typeof verifyProxies
      deleteProxies: typeof deleteProxies

      addWallets: typeof addWallets
      getWallets: typeof getWallets
      refreshWallets: typeof refreshWallets
      collectFunds: typeof collectFunds

      getLocks: typeof getLocks
      refreshLock: typeof refreshLock
    }
    electron: ElectronAPI & {
      on: <T extends IPCEvent['type']>(
        type: T,
        fn: (data: Extract<IPCEvent, { type: T }>['data']) => void
      ) => () => void
    }
  }
}
