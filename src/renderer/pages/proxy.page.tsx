import { Divider } from 'antd'

import { ButtonAddProxies } from '~/components/proxies/button-add-proxies'
import { ButtonDeleteAllProxies } from '~/components/proxies/button-delete-all-proxies'
import { ButtonVerifyProxies } from '~/components/proxies/button-verify-proxies'
import { TableProxies } from '~/components/proxies/table-proxies'

export function ProxyPage() {
  return (
    <>
      <div className="mb-4 flex gap-2 items-center">
        <ButtonAddProxies />
        <Divider type="vertical" />

        <ButtonVerifyProxies />

        <div className="grow" />

        <ButtonDeleteAllProxies />
      </div>

      <TableProxies />
    </>
  )
}
