import { Proxy } from '#/types/db.type'
import axios from 'axios'
import caseConverter, { ApplyCaseMiddleware } from 'axios-case-converter'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { get } from 'lodash-es'

const applyCaseMiddleware = get(caseConverter, 'default') as unknown as ApplyCaseMiddleware

export const api = applyCaseMiddleware(axios.create())

export function createAPIClient(args: {
  baseURL?: string
  proxy?: Pick<Proxy, 'host' | 'password' | 'port' | 'username'>
  useCaseMiddleware?: boolean
}) {
  const { baseURL, proxy: { host, password, port, username } = {}, useCaseMiddleware = true } = args
  const agent = host
    ? new HttpsProxyAgent(`http://${username}:${password}@${host}:${port}`)
    : undefined

  const instance = axios.create({ baseURL, httpAgent: agent, httpsAgent: agent })

  return useCaseMiddleware ? applyCaseMiddleware(instance) : instance
}
