import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: { // proxy here saying that whenever we go to anything that has /api 
      '/api': { // then open up an object here
        target: 'http://localhost:6000', // then we're going to have a target and that target is going to be http http://localhost:6000 which is our backend server
        changeOrigin: true // same as if you create react app and you add a proxy in the pacjage.json file.
      }
    }
  }
})
