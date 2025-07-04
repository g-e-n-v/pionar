import { Button, Input, Modal } from 'antd'
import { WalletAdd } from 'iconsax-reactjs'
import { useState } from 'react'

export function ButtonAddWallets() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        icon={<WalletAdd size={16} variant="Bulk" />}
        onClick={() => setOpen(true)}
        type="primary"
      >
        Add wallets
      </Button>

      <Modal
        okText="Add"
        onCancel={() => setOpen(false)}
        open={open}
        title="Add wallets"
        width="80vw"
      >
        <div className="mb-6">Each mnemonic phrase is on a line.</div>
        <Input.TextArea autoSize={{ maxRows: 12, minRows: 4 }} className="text-nowrap" />
      </Modal>
    </>
  )
}
