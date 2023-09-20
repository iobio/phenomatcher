import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dsv from '@rollup/plugin-dsv'
import vuetify from 'vite-plugin-vuetify'
import { createVuetify } from 'vite-plugin-vuetify'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dsv(),
    vuetify()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client', import.meta.url))
    }
  }
})
