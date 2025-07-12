import { db } from '#/database'
import { api } from '#/services/api-client.service'
import { getKeypair } from '#/services/stellar.service'
import { LockInsert } from '#/types/db.type'
import { AccountResponse, ClaimantResponse } from '#/types/horizon.type'
import { max, pick, round } from 'lodash-es'

export async function addWallets(mnemonics: Array<string>) {
  for (const mnemonic of mnemonics) {
    const { privateKey, publicKey } = getKeypair(mnemonic)

    await db
      .insertInto('wallet')
      .values({ mnemonic, privateKey, publicKey })
      .onConflict((builder) => builder.doNothing())
      .execute()

    const walletId = await db
      .selectFrom('wallet')
      .select('id')
      .where('publicKey', '=', publicKey)
      .executeTakeFirstOrThrow()
      .then((rs) => rs.id)

    await updateWallet(walletId, { publicKey })
  }
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

export async function updateWallet(walletId: number, args: { publicKey?: string }) {
  const {
    publicKey = await db
      .selectFrom('wallet')
      .select('publicKey')
      .where('id', '=', walletId)
      .executeTakeFirstOrThrow()
  } = args

  try {
    const getAccount = await api.get<AccountResponse>(
      `https://horizon.piscan.io/accounts/${publicKey}`
    )
    const getClaimants = await api.get<ClaimantResponse>(
      `https://horizon.piscan.io/claimable_balances?claimant=${publicKey}&limit=100`
    )
    const nativeBalance = Number(
      getAccount.data.balances.find((item) => item.assetType === 'native')?.balance ?? -1
    )

    const wallet = {
      ...pick(getAccount.data, ['subentryCount', 'numSponsored', 'numSponsoring']),
      nativeBalance
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
  }
}
