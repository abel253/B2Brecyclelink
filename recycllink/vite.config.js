import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // ለ Shadcn @/ አቋራጭ መንገድ ካስፈለገህ

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4 እዚህ ጋር ይገባል
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})