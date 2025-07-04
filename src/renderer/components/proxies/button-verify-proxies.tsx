import { Button, Input } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'
import { useState } from 'react'

import { useVerifyProxies } from '~/api/use-verify-proxies'

export function ButtonVerifyProxies() {
  const [inputValue, setInputValue] = useState('https://api.mainnet.minepi.com')

  const verifyProxies = useVerifyProxies()

  const handleVerifyProxies = async () => {
    await verifyProxies.mutateAsync(inputValue)
  }

  return (
    <div className="flex gap-2">
      <Input
        className="w-56"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="URL"
        value={inputValue}
      />
      <Button
        disabled={verifyProxies.isPending}
        icon={<Refresh2 size={16} variant="Bulk" />}
        loading={verifyProxies.isPending}
        onClick={handleVerifyProxies}
      >
        Check
      </Button>
    </div>
  )
}
