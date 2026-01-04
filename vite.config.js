import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/tube/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // <--- Выключи для dev
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        navigateFallback: '/tube/index.html',
        navigateFallbackDenylist: [/^\/api/]
      },
      manifest: {
        name: 'Tube',
        short_name: 'Tube',
        description: 'Персональный YouTube без прокрастинации',
        start_url: '/tube/',
        scope: '/tube/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#ff0000',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})