import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsconfigPaths()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tsconfigPaths()]
  },
  renderer: {
    plugins: [tsconfigPaths(), react(), tailwindcss()]
  }
})
