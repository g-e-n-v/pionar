import { Divider } from 'antd'

import { ButtonAddProxies } from '~/components/button-add-proxies'
import { ButtonDeleteAllProxies } from '~/components/button-delete-all-proxies'
import { ButtonVerifyProxies } from '~/components/button-verify-proxies'
import { TableProxies } from '~/components/table-proxies'

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
