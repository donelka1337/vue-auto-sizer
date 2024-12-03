import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
const path = require('path')

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.js'),
      name: 'AutoSizer',
      fileName: "vue-auto-sizer",
    },
  },
  rollupOptions: {
    external: [
      {vue: path.resolve('./node_modules/vue')}
    ],
    output: {
      globals: {
        vue: 'Vue',
      },
    },
  },
  resolve: {
    alias:{
      '@': path.resolve(__dirname, "./src"),
    },
    dedupe: ['vue'],
  },
})
