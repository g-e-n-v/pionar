import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const atomMasterWallet = atomWithStorage<string>('master-wallet', '')

export const useMasterWallet = () => useAtom(atomMasterWallet)
export const useSetMasterWallet = () => useSetAtom(atomMasterWallet)
export const useMasterWalletValue = () => useAtomValue(atomMasterWallet)
