import { db } from '#/database'

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
      'wallet.status'
    ])
    .execute()

  return locks
}
