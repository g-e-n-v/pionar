export type AccountResponse = {
  accountId: string
  balances: Array<{
    assetType: string
    balance: string
    buyingLiabilities: string
    sellingLiabilities: string
  }>
  data: Record<string, unknown>
  flags: {
    authClawbackEnabled: boolean
    authImmutable: boolean
    authRequired: boolean
    authRevocable: boolean
  }
  id: string
  lastModifiedLedger: number
  lastModifiedTime: number
  links: {
    data: {
      href: string
      templated: boolean
    }
    effects: {
      href: string
      templated: boolean
    }
    offers: {
      href: string
      templated: boolean
    }
    operations: {
      href: string
      templated: boolean
    }
    payments: {
      href: string
      templated: boolean
    }
    self: {
      href: string
    }
    trades: {
      href: string
      templated: boolean
    }
    transactions: {
      href: string
      templated: boolean
    }
  }
  numSponsored: number
  numSponsoring: number
  pagingToken: string
  sequence: string
  sequenceLedger: number
  sequenceTime: string
  signers: Array<{
    key: string
    type: string
    weight: number
  }>
  subentryCount: number
  thresholds: {
    highThreshold: number
    lowThreshold: number
    medThreshold: number
  }
}

export type ClaimantResponse = {
  embedded: {
    records: Array<{
      amount: string
      asset: string
      claimants: Array<{
        destination: string
        predicate: {
          not?: {
            absBefore: string
            absBeforeEpoch: string
          }
          unconditional?: boolean
        }
      }>
      flags: {
        clawbackEnabled: boolean
      }
      id: string
      lastModifiedLedger: number
      lastModifiedTime?: string
      links: {
        operations: {
          href: string
          templated: boolean
        }
        self: {
          href: string
        }
        transactions: {
          href: string
          templated: boolean
        }
      }
      pagingToken: string
      sponsor: string
    }>
  }
  links: {
    next: {
      href: string
    }
    prev: {
      href: string
    }
    self: {
      href: string
    }
  }
}
