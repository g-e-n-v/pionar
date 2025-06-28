import PQueueModule from 'p-queue'

// @ts-ignore esm
type Options = ConstructorParameters<(typeof PQueueModule)['default']>[0]

// @ts-ignore esm
const PQueue = PQueueModule.default

console.log('PQueue', PQueue)

export const createPromiseQueue = (options?: Options): PQueueModule => new PQueue(options)
