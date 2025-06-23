import { QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider, Divider, Layout, Menu, MenuProps, Spin } from 'antd'
import { CloudConnection, Drop, Refresh, Tag } from 'iconsax-reactjs'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import { useResetDatabase } from '~/api/use-reset-database'
import { antTheme } from '~/configs/ant.config'
import { queryClient } from '~/configs/tanstack-query.config'
import { FeeWalletsPage } from '~/pages/fee-wallets.page'
import { ProxyPage } from '~/pages/proxy.page'
import '~/global.css'

import '@ant-design/v5-patch-for-react-19'

import { TagPage } from '~/pages/tag.page'

const { Content, Sider } = Layout

export function ElectronApp() {
  const { modal, notification } = App.useApp()

  const resetDatabase = useResetDatabase()

  const [selectedKey, setSelectedKey] = useState('proxy')

  const handleMenuItemClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'reset-database') {
      const confirmModal = modal.confirm({
        content: 'Are you sure you want to reset the database? This will delete all data.',
        onCancel: () => confirmModal.destroy(),
        onOk: async () => {
          await resetDatabase.mutateAsync()
          await queryClient.invalidateQueries()
          notification.success({ message: 'Database reset successfully' })
        },
        title: 'Reset database'
      })

      return
    }

    setSelectedKey(key)
  }

  return (
    <Layout className="h-screen w-screen">
      <Sider className="flex flex-col" collapsedWidth={60} collapsible theme="light">
        <Menu
          items={[
            {
              icon: <Drop size={16} variant="Bulk" />,
              key: 'fee-wallets',
              label: 'Fee Wallets'
            },
            {
              icon: <CloudConnection size={16} variant="Bulk" />,
              key: 'proxy',
              label: 'Proxy'
            },
            {
              icon: <Tag size={16} variant="Bulk" />,
              key: 'tag',
              label: 'Tags'
            },
            {
              label: <Divider className="my-0" />,
              type: 'group'
            },
            {
              disabled: resetDatabase.isPending,
              icon: resetDatabase.isPending ? (
                <Spin size="small" />
              ) : (
                <Refresh size={16} variant="Bulk" />
              ),
              key: 'reset-database',
              label: 'Reset database'
            }
          ]}
          mode="inline"
          onClick={handleMenuItemClick}
          selectedKeys={[selectedKey]}
        />
      </Sider>
      <Layout>
        <Content className="p-4">
          {selectedKey === 'tag' && <TagPage />}
          {selectedKey === 'fee-wallets' && <FeeWalletsPage />}
          {selectedKey === 'proxy' && <ProxyPage />}
        </Content>
      </Layout>
    </Layout>
  )
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={antTheme}>
      <App notification={{ showProgress: true }}>
        <ElectronApp />
      </App>
    </ConfigProvider>
  </QueryClientProvider>
)
