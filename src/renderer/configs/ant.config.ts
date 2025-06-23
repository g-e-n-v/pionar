import { ThemeConfig } from 'antd'

export const antTheme: ThemeConfig = {
  components: {
    ColorPicker: {
      fontFamily: `var(--font-mono)`
    },
    Tag: {
      borderRadiusSM: 999
    }
  },
  token: {
    colorPrimary: '#22c55e',
    fontFamily: `var(--font-outfit)`
  }
}
