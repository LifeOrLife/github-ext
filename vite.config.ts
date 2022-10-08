import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

const copyFile = (files: string[]) => {

  return {
    name: 'copy-file',
    buildEnd(...arg: any[]) {
      console.log(arg)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'ext',
    lib: {
      entry: resolve(__dirname, 'src/background.ts'),
      name: 'content',
    }
  }
})
