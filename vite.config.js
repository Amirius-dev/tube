import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/tube/'
    : '/',  // <--- ОБЯЗАТЕЛЬНО! Имя твоего репозитория с / в конце
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      manifest: {
        name: 'Tube',
        short_name: 'Tube',
        description: 'Персональный YouTube без прокрастинации',
        start_url: '/', // то же, что base
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ff0000', // как у YouTube, или свой
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          // добавь maskable если сделал
        ]
      }
    })
  ]
})