import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/my-youtube-pwa/',  // <--- ОБЯЗАТЕЛЬНО! Имя твоего репозитория с / в конце
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true }, // чтобы в dev режиме тоже тестировать PWA
      manifest: {
        name: 'MyTube',
        short_name: 'MyTube',
        description: 'Персональный YouTube без прокрастинации',
        start_url: '/my-youtube-pwa/', // то же, что base
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