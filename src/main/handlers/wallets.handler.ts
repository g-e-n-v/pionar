import { db } from '#/database'
import { upsert } from '#/database/utils/upsert.db'
import { getProxies } from '#/handlers/proxies.handler'
import { createAPIClient } from '#/services/api-client.service'
import { createPromiseQueue } from '#/services/promise-queue.service'
import { getKeypair } from '#/services/stellar.service'
import { LockInsert, Proxy, WalletUpdate } from '#/types/db.type'
import { AccountResponse, ClaimantResponse } from '#/types/horizon.type'
import { max, pick, round } from 'lodash-es'

export async function addWallets(mnemonics: Array<string>) {
  const proxies = await getProxies()
  const queue = createPromiseQueue({ concurrency: 100 })

  const tasks = mnemonics.map((mnemonic, idx) => async () => {
    const { privateKey, publicKey } = getKeypair(mnemonic)
    const proxy = proxies[idx % proxies.length]

    const wallet = await upsert('wallet', { mnemonic, privateKey, publicKey }, 'mnemonic')

    await updateWallet(wallet.id, { proxy })
  })

  queue.addAll(tasks)
}

export async function getWallets() {
  const BASE_REVERSE = 0.49

  const rawWallets = await db
    .selectFrom('wallet')
    .select([
      'wallet.id as walletId',
      'wallet.mnemonic as mnemonic',
      'wallet.nativeBalance as nativeBalance',
      'wallet.numSponsored as numSponsored',
      'wallet.numSponsoring as numSponsoring',
      'wallet.subentryCount as subentryCount',
      'wallet.publicKey as publicKey',
      'wallet.privateKey as privateKey',
      'wallet.updatedAt as walletUpdatedAt'
    ])
    .execute()

  const wallets = rawWallets.map((wallet) => {
    const { nativeBalance, numSponsored, numSponsoring, subentryCount } = wallet

    const minReserve = (2 + subentryCount + numSponsoring - numSponsored) * BASE_REVERSE + 0.01
    const availableBalance = nativeBalance && max([round(nativeBalance - minReserve, 7), 0])

    return { ...wallet, availableBalance }
  })

  return wallets
}

export async function refreshWallets(walletIds: Array<number>) {
  const proxies = await getProxies()
  const queue = createPromiseQueue({ concurrency: 100 })

  const tasks = walletIds.map((walletId) => async () => {
    const proxy = proxies[walletId % proxies.length]
    await updateWallet(walletId, { proxy })
  })

  queue.addAll(tasks)
}

async function updateWallet(
  walletId: number,
  options: { proxy?: Pick<Proxy, 'host' | 'password' | 'port' | 'username'> } = {}
) {
  const { proxy } = options

  await db
    .updateTable('wallet')
    .set({ status: 'processing' })
    .where('id', '=', walletId)
    .executeTakeFirst()

  const { publicKey } = await db
    .selectFrom('wallet')
    .select('publicKey')
    .where('id', '=', walletId)
    .executeTakeFirstOrThrow()

  try {
    const api = createAPIClient({ proxy })

    const getAccount = await api.get<AccountResponse>(
      `https://horizon.piscan.io/accounts/${publicKey}`
    )
    const getClaimants = await api.get<ClaimantResponse>(
      `https://horizon.piscan.io/claimable_balances?claimant=${publicKey}&limit=100`
    )
    const nativeBalance = Number(
      getAccount.data.balances.find((item) => item.assetType === 'native')?.balance ?? -1
    )

    const wallet: WalletUpdate = {
      ...pick(getAccount.data, ['subentryCount', 'numSponsored', 'numSponsoring']),
      nativeBalance,
      status: 'valid'
    }
    await db.updateTable('wallet').set(wallet).where('id', '=', walletId).execute()

    const locks = getClaimants.data.embedded.records.reduce<LockInsert[]>((acc, record) => {
      const claimant = record.claimants.find((claimant) => claimant.destination === publicKey)

      if (!claimant?.predicate.unconditional) return acc

      return [
        ...acc,
        {
          amount: Number(record.amount),
          unlockAt: claimant?.predicate.not?.absBefore ?? '',
          walletId
        }
      ]
    }, [])

    locks.length && (await db.insertInto('lock').values(locks).execute())
  } catch (error) {
    console.log(String(error))
    await db.updateTable('wallet').set({ status: 'invalid' }).where('id', '=', walletId).execute()
  }
}
