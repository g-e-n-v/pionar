import { App, Button, Input, Modal } from 'antd'
import { WalletAdd } from 'iconsax-reactjs'
import { useState } from 'react'

import { useAddWallets } from '~/api/use-add-wallets'
import { genGetWalletsKey } from '~/api/use-get-wallets'
import { SelectTags } from '~/components/select/select-tags'
import { queryClient } from '~/configs/tanstack-query.config'

export function ButtonAddWallets() {
  const { notification } = App.useApp()

  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>()
  const [tags, setTags] = useState<Array<number>>([])

  const addWallets = useAddWallets()

  const handleAddWallets = async () => {
    if (!inputValue) return

    setOpen(false)
    setInputValue('')

    const mnemonics = inputValue
      .split('\n')
      .filter(Boolean)
      .map((mnemonic) =>
        mnemonic
          .toLowerCase()
          .trim()
          .replace(/[^a-z\s]/g, '')
          .replace(/\s+/g, ' ')
      )
    await addWallets.mutateAsync({ mnemonics, tagIds: tags })

    notification.success({ message: 'Add wallets successfully' })
    queryClient.invalidateQueries({ queryKey: genGetWalletsKey() })
  }

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
        okButtonProps={{ disabled: addWallets.isPending, loading: addWallets.isPending }}
        okText="Add"
        onCancel={() => setOpen(false)}
        onOk={handleAddWallets}
        open={open}
        title="Add wallets"
        width="80vw"
      >
        <SelectTags className="w-full mb-4" onChange={setTags} value={tags} />
        <div className="mb-2">Each mnemonic phrase is on a line.</div>
        <Input.TextArea
          autoSize={{ maxRows: 12, minRows: 4 }}
          className="text-nowrap"
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
        />
      </Modal>
    </>
  )
}
