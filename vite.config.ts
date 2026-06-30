import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: '/wnl-admin/',
    server: {
      port: 1112,
      proxy: {
        '/api': {
          target: 'http://localhost:1112', // 或者你的实际后端地址
          changeOrigin: true,
        },
      },
    },
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(), // 自动引入依赖
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: './src/auto-imports.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
