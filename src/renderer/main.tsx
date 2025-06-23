import { ConfigProvider, Layout, Menu } from 'antd'
import { CloudConnection, Drop, Tag } from 'iconsax-reactjs'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '~/global.css'

const { Content, Sider } = Layout

export function ElectronApp() {
  return (
    <Layout className="h-screen w-screen">
      <Sider collapsedWidth={60} collapsible theme="light">
        <Menu
          defaultSelectedKeys={['proxy']}
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
            }
          ]}
          mode="inline"
        />
      </Sider>
      <Layout>
        <Content>Content</Content>
      </Layout>
    </Layout>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: `'Outfit', sans-serif`
        }
      }}
    >
      <ElectronApp />
    </ConfigProvider>
  </StrictMode>
)
