import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Chemins absolus : nécessaires pour les URL à plusieurs niveaux
  // (ex. /boutique-noel/hoodie-signature-noir) lors d'un accès direct ou d'un rechargement
  base: '/',
})
