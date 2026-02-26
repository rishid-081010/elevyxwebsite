import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ecosystem: resolve(__dirname, 'ecosystem.html'),
        marketing: resolve(__dirname, 'marketing.html'),
        realestate: resolve(__dirname, 'real-estate.html'),
        storefront: resolve(__dirname, 'storefront.html'),
        workflows: resolve(__dirname, 'workflows.html'),
        chatbot: resolve(__dirname, 'chatbot.html'),
      },
    },
  },
})
