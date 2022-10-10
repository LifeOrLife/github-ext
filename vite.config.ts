import { fileURLToPath, URL } from 'node:url'
import http from 'node:http'
import type { ServerResponse } from 'node:http'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import timeReporter from 'vite-plugin-time-reporter'

let response: ServerResponse;
http.createServer((req, res) => {
  response = res;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
  });
  res.write("data: init" + "\n\n");
}).listen(2233)

const reloadPlugin = () => {
  return {
    name: 'reload-html',
    buildEnd() {
      console.log("\r\n   开始更新插件   \r\n");
      try {
        if (response) {
          response.write("data:" + "refresh" + "\n\n");
        }
      } catch (error) {
        console.log(error);
        process.exit();
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  plugins: [vue(), reloadPlugin(), timeReporter()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'background.html'),
        popup: resolve(__dirname, 'popup.html'),
      },
    },
    outDir: 'ext',
    // lib: {
    //   entry: resolve(__dirname, 'src/content.ts'),
    //   name: 'content',
    //   fileName: 'content',
    // }
  }
})
