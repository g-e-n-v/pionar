import type { AxiosInstance } from 'axios'

import { Keypair } from '@stellar/stellar-sdk'
import axios from 'axios'
import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { get } from 'lodash-es'

export function getKeypair(mnemonic: string) {
  const seed = mnemonicToSeedSync(mnemonic)
  const derived = derivePath("m/44'/314159'/0'", seed.toString('hex'))

  const keypair = Keypair.fromRawEd25519Seed(Buffer.from(derived.key))

  return {
    keypair,
    privateKey: keypair.secret(),
    publicKey: keypair.publicKey()
  }
}

export async function loadAccount(args: { client?: AxiosInstance; publicKey: string }) {
  const { client = axios.create(), publicKey } = args

  const { data } = await client.get(`/accounts/${publicKey}`)
  const account = Object.assign(data, {
    _baseAccount: {
      _accountId: get(data, 'account_id'),
      sequence: get(data, 'sequence')
    },
    accountId: () => get(data, 'account_id'),
    incrementSequenceNumber: () => `${Number(get(data, 'sequence')) + 1}`,
    sequenceNumber: () => get(data, 'sequence')
  })

  return account
}
