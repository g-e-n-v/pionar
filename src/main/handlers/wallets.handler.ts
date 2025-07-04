import { db } from '#/database'
import { api } from '#/services/api-client.service'
import { getKeypair } from '#/services/stellar.service'
import { LockInsert } from '#/types/db.type'
import { AccountResponse, ClaimantResponse } from '#/types/horizon.type'
import { pick } from 'lodash-es'

export async function addWallets(mnemonics: Array<string>) {
  for (const mnemonic of mnemonics) {
    const { privateKey, publicKey } = getKeypair(mnemonic)

    const getAccount = await api.get<AccountResponse>(
      `https://horizon.piscan.io/accounts/${publicKey}`
    )
    const getClaimants = await api.get<ClaimantResponse>(
      `https://horizon.piscan.io/claimable_balances?claimant=${publicKey}&limit=100`
    )

    const nativeBalance = Number(
      getAccount.data.balances.find((item) => item.assetType === 'native')?.balance ?? -1
    )

    const existWallet = await db
      .selectFrom('wallet')
      .where('wallet.mnemonic', '=', mnemonic)
      .select('wallet.id')
      .executeTakeFirst()

    const wallet = {
      ...pick(getAccount.data, ['subentryCount', 'numSponsored', 'numSponsoring']),
      mnemonic,
      nativeBalance,
      privateKey,
      publicKey
    }

    const walletId = await (async () => {
      if (existWallet) {
        await db.updateTable('wallet').set(wallet).where('id', '=', existWallet.id).execute()
        return existWallet.id
      } else {
        const { insertId } = await db.insertInto('wallet').values(wallet).executeTakeFirst()
        return Number(insertId)
      }
    })()

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
  }
}
