import { db } from '#/database'
import { createAPIClient } from '#/services/api-client.service'
import { ClaimantResponse } from '#/types/horizon.type'

export async function getLocks() {
  const locks = await db
    .selectFrom('lock')
    .leftJoin('wallet', 'wallet.id', 'lock.walletId')
    .select([
      'lock.id',
      'lock.amount',
      'lock.unlockAt',
      'lock.balanceId',
      'lock.walletId',
      'wallet.publicKey',
      'wallet.mnemonic',
      'wallet.status',
      'lock.isClaimed'
    ])
    .orderBy('lock.unlockAt', 'asc')
    .execute()

  return locks
}

export async function refreshLock(lockId: number) {
  const { balanceId, publicKey } = await db
    .selectFrom('lock')
    .leftJoin('wallet', 'wallet.id', 'lock.walletId')
    .select(['wallet.publicKey', 'lock.balanceId'])
    .where('lock.id', '=', lockId)
    .executeTakeFirstOrThrow()

  const api = createAPIClient()

  const getClaimants = await api.get<ClaimantResponse>(
    `https://horizon.piscan.io/claimable_balances?claimant=${publicKey}&limit=100`
  )

  const isClaimed = getClaimants.data.embedded.records.every((record) => record.id !== balanceId)

  if (isClaimed) {
    await db.updateTable('lock').set({ isClaimed: 1 }).where('id', '=', lockId).execute()
  }
}
