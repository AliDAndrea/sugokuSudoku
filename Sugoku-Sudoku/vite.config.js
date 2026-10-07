import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import profilePersistence from './profilePersistence.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), profilePersistence()],
})
