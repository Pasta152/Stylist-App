import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: {
      proxy: {
        // In dev, proxy /api/chat → OpenAI directly (with your key injected server-side)
        // In production, Vercel runs api/chat.js as a serverless function
        '/api/chat': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: () => '/v1/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.OPENAI_API_KEY || ''
              proxyReq.setHeader('Authorization', `Bearer ${key}`)
            })
          },
        },
      },
    },
  }
})
