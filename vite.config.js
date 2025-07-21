import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const now = new Date()
const hh = now.getHours().toString().padStart(2, '0')
const mm = now.getMinutes().toString().padStart(2, '0')
const buildTime = `${hh}:${mm}`
const versionTag = `v${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
    __APP_VERSION__: JSON.stringify(versionTag)
  }
})
