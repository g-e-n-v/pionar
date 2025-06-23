import { App, Button, Input, Modal } from 'antd'
import { CloudPlus } from 'iconsax-reactjs'
import { useState } from 'react'

import { useAddProxies } from '~/api/use-add-proxies'
import { genGetProxiesKey } from '~/api/use-get-proxies'
import { queryClient } from '~/configs/tanstack-query.config'

export function ButtonAddProxies() {
  const { notification } = App.useApp()

  const [open, setOpen] = useState(false)

  const addProxies = useAddProxies()

  const [inputValue, setInputValue] = useState<string>()

  const handleAddProxies = async () => {
    const proxies = inputValue?.split('\n').map((s) => {
      const [host, port, username, password] = s.split(':')
      return {
        host,
        password,
        port: Number(port),
        username
      }
    })

    await addProxies.mutateAsync(proxies ?? [])
    queryClient.invalidateQueries({ queryKey: genGetProxiesKey() })
    notification.success({ message: 'Add proxies successfully' })
    setInputValue('')
    setOpen(false)
  }

  return (
    <>
      <Button
        icon={<CloudPlus size={16} variant="Bulk" />}
        onClick={() => setOpen(true)}
        type="primary"
      >
        Add proxy
      </Button>

      <Modal
        okButtonProps={{ disabled: addProxies.isPending, loading: addProxies.isPending }}
        onCancel={() => setOpen(false)}
        onOk={handleAddProxies}
        open={open}
        title="Add proxies"
        width="50vw"
      >
        <div className="mb-6">
          Please enter the list of proxies in the following format:{' '}
          <span className="font-bold text-red-500">host:port:user:pass</span>
        </div>

        <Input.TextArea
          autoSize={{ maxRows: 12, minRows: 4 }}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="Enter proxies"
          value={inputValue}
        />
      </Modal>
    </>
  )
}
