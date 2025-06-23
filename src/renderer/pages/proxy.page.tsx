import { Divider } from 'antd'

import { ButtonAddProxies } from '~/components/button-add-proxies'
import { ButtonVerifyProxies } from '~/components/button-verify-proxies'
import { TableProxies } from '~/components/table-proxies'

export function ProxyPage() {
  return (
    <>
      <div className="mb-2 flex gap-2 items-center">
        <ButtonAddProxies />
        <Divider type="vertical" />

        <ButtonVerifyProxies />
      </div>

      <TableProxies />
    </>
  )
}
