// vite.config.ts - Host
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-mf',
      filename: 'remoteEntry.js',
      remotes: {
        reactMF: 'http://localhost:5001/assets/remoteEntry.js',
        vueMF: 'http://localhost:5002/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'vue']
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})