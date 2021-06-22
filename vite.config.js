import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})