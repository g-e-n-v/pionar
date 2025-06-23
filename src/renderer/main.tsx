import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider, Divider, Layout, Menu, MenuProps, Spin } from 'antd'
import { CloudConnection, Drop, Refresh, Tag } from 'iconsax-reactjs'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import { useResetDatabase } from '~/api/use-reset-database'
import '~/global.css'
import { TagPage } from '~/pages/tag.page'

const { Content, Sider } = Layout

export function ElectronApp() {
  const { message } = App.useApp()

  const resetDatabase = useResetDatabase()

  const [selectedKey, setSelectedKey] = useState('tag')

  const handleMenuItemClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'reset-database') {
      await resetDatabase.mutateAsync()
      message.success('Database reset successfully')
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
              icon: <Drop size={16} variant="Bulk" />,
              key: 'fee-wallet',
              label: 'Fee Wallet'
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
        <Content className="p-4">{selectedKey === 'tag' && <TagPage />}</Content>
      </Layout>
    </Layout>
  )
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            borderRadiusSM: 999
          }
        },
        token: {
          fontFamily: `'Outfit', sans-serif`
        }
      }}
    >
      <App>
        <ElectronApp />
      </App>
    </ConfigProvider>
  </QueryClientProvider>
)
