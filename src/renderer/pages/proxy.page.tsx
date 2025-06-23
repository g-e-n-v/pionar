import { ButtonAddProxies } from '~/components/button-add-proxies'
import { TableProxies } from '~/components/table-proxies'

export function ProxyPage() {
  return (
    <>
      <div className="mb-6">
        <ButtonAddProxies />
      </div>

      <TableProxies />
    </>
  )
}
