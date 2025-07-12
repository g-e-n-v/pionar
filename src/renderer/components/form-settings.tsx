import { Form, Input } from 'antd'

import { useMasterWallet } from '~/stores/setting.store'

export function FormSettings() {
  const [masterWallet, setMasterWallet] = useMasterWallet()

  return (
    <div className="mb-4">
      <Form.Item label="Master Wallet" layout="vertical">
        <Input
          className="w-full"
          onChange={(e) => setMasterWallet(e.target.value)}
          value={masterWallet}
        />
      </Form.Item>
    </div>
  )
}
