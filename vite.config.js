// Vite 설정 파일: React 플러그인을 연결하여 JSX 문법을 브라우저가 이해할 수 있게 변환합니다.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
