import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template:{
      transformAssetUrls: {
        base: null, // Set base to null to avoid prepending the base path
        includeAbsolute: false // Do not include absolute paths
      }
    }
  })],
})
