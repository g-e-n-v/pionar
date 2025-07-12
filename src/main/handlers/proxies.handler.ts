import { db } from '#/database'
import { sendEvent } from '#/services/window.service'
import { ProxyInsert, ProxyUpdate } from '#/types/db.type'
import axios from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { get } from 'lodash-es'

export async function addProxies(proxies: ProxyInsert[]) {
  return await db.insertInto('proxy').values(proxies).execute()
}

export async function deleteProxies() {
  return await db.deleteFrom('proxy').execute()
}

export async function getProxies() {
  return await db
    .selectFrom('proxy')
    .select(['id', 'host', 'port', 'username', 'password', 'status'])
    .execute()
}

export async function updateProxy(id: number, proxy: ProxyUpdate) {
  return await db.updateTable('proxy').set(proxy).where('id', '=', id).execute()
}

export async function verifyProxies(url: string) {
  const proxies = await getProxies()

  const tasks = proxies.map(async ({ host, id, password, port, username }) => {
    const proxyUrl = `http://${username}:${password}@${host}:${port}`
    const agent = new HttpsProxyAgent(proxyUrl)

    await updateProxy(id, { status: 'processing' })
    sendEvent('proxy:status', { id, status: 'processing' })

    try {
      await axios.get(url, { httpAgent: agent, httpsAgent: agent })
      updateProxy(id, { status: 'active' })
      sendEvent('proxy:status', { id, status: 'active' })
    } catch (error) {
      const code = get(error, 'code')

      const ERROR_MESSAGE = {
        ECONNREFUSED: 'Kết nối bị từ chối (Connection refused)',
        ENOTFOUND: 'Không tìm thấy host (DNS Error)',
        ETIMEDOUT: 'Hết thời gian chờ (Timeout)'
      }

      const reason = ERROR_MESSAGE[code ?? ''] || 'Lỗi không xác định'

      await updateProxy(id, { note: reason, status: 'inactive' })
      sendEvent('proxy:status', { id, status: 'inactive' })
    }
  })

  await Promise.all(tasks)
}
