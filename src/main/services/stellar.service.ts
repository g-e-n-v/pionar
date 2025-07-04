import { Keypair } from '@stellar/stellar-sdk'
import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'

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
