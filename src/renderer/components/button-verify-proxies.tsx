import { Button, Input } from 'antd'
import { Refresh2 } from 'iconsax-reactjs'
import { useState } from 'react'

export function ButtonVerifyProxies() {
  const [inputValue, setInputValue] = useState('https://api.mainnet.minepi.com')

  return (
    <div className="flex gap-2">
      <Input
        className="w-56"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="URL"
        value={inputValue}
      />
      <Button icon={<Refresh2 size={16} variant="Bulk" />}>Check</Button>
    </div>
  )
}
