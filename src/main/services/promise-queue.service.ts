import PQueueModule from 'p-queue'

// @ts-ignore esm
type Options = ConstructorParameters<typeof PQueueModule>[0]

// @ts-ignore esm
const PQueue = PQueueModule.default

export const createPromiseQueue = (options?: Options): PQueueModule => new PQueue(options)
