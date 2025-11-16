import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta línea es crucial para GitHub Pages. 
  // Asegura que los archivos se busquen en la ruta relativa correcta (./) 
  // en lugar de en la raíz del dominio (/).
  base: './', 
})