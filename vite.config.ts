import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      registerType: 'autoUpdate',  // Automatically update the service worker
      manifest: {
        name: 'Saarock - Personal Blog & Projects',
        short_name: 'Saarock',
        description: 'Saarock is a personal web app featuring blogs and projects.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  

  ],
});
