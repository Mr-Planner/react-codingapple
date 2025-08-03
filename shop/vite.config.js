import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
plugins: [
    react(),
    VitePWA({
      // 자동 업데이트 여부 
      // 서버에 새로운 html js 파일이 있으면 update할지 
      registerType: 'autoUpdate', 
      devOptions: {
        enabled: true // 개발 중 pwa 미리보기 (ex. service worker 같은 파일들)
      },

      workbox: {
        // 캐싱할 파일들 목록
        // build시 생성되는 파일 캐싱 
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'] 
      },

      // public 폴더 안의 파일들 캐싱
      includeAssets: ['apple-touch-icon.png'],
      
      // 앱 정보 저장 (manifest.json 파일 생성)
      manifest: {
        name: '테스트용 리액트앱',
        short_name: 'MyApp',
        description: '설명',
        theme_color: '#000000', // 폰의 status bar 색상
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
    })
  ],
})
