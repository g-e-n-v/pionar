import { db } from '#/database'
import { ProxyInsert } from '#/types/db.type'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { get } from 'lodash-es'

export async function addProxies(proxies: ProxyInsert[]) {
  return await db.insertInto('proxy').values(proxies).execute()
}

export async function getProxies() {
  return await db
    .selectFrom('proxy')
    .select(['id', 'host', 'port', 'username', 'password', 'status'])
    .execute()
}

export async function verifyProxies(url: string) {
  const proxies = await getProxies()

  proxies.forEach(async ({ host, password, port, username }) => {
    const proxyUrl = `http://${username}:${password}@${host}:${port}`
    const agent = new HttpsProxyAgent(proxyUrl)

    try {
      await axios.get(url, { httpAgent: agent, httpsAgent: agent })
      console.log(`✅ ${proxyUrl}`)
    } catch (error) {
      const code = get(error, 'code')

      const ERROR_MESSAGE = {
        ECONNREFUSED: 'Kết nối bị từ chối (Connection refused)',
        ENOTFOUND: 'Không tìm thấy host (DNS Error)',
        ETIMEDOUT: 'Hết thời gian chờ (Timeout)'
      }

      const reason = ERROR_MESSAGE[code ?? ''] || 'Không xác định'
      console.log(reason)
    }
  })
}
