import { db } from '#/database'
import { createAPIClient } from '#/services/api-client.service'
import { TagSelect } from '#/types/db.type'
import { ClaimantResponse } from '#/types/horizon.type'
import { sql } from 'kysely'

export async function getLocks() {
  const locks = await db
    .selectFrom('lock')
    .leftJoin('wallet', 'wallet.id', 'lock.walletId')
    .leftJoin('junctionWalletTag', 'junctionWalletTag.walletId', 'wallet.id')
    .leftJoin('tag', 'tag.id', 'junctionWalletTag.tagId')
    .select([
      'lock.id',
      'lock.amount',
      'lock.unlockAt',
      'lock.balanceId',
      'lock.walletId',
      'wallet.publicKey',
      'wallet.mnemonic',
      'wallet.status',
      'lock.isClaimed',
      sql<string>`
        COALESCE(
          json_group_array(
            DISTINCT json_object(
              'text', tag.text,
              'color', tag.color
            )
          ), '[]'
        )
      `.as('tags')
    ])
    .groupBy('lock.id')
    .orderBy('lock.unlockAt', 'asc')
    .execute()

  return locks.map((lock) => ({
    ...lock,
    tags: JSON.parse(lock.tags ?? '[]') as Array<Pick<TagSelect, 'color' | 'text'>>
  }))
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
