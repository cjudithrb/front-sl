import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: '/', // accessing env variable is not possible here. So hard coding this.
  define: {
    global: 'window'
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1')
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1')
      }
    ]
  },
  server: {
    open: true,
    host: '0.0.0.0',  // Asegura que Vite escuche en todas las interfaces
    port: process.env.PORT || 3000,  // Usa el puerto de la variable de entorno o 3000 como fallback
    proxy: {
      '/autenticacion': {
        target: 'https://back-end-superlearnerv1.onrender.com/autenticacion/login',
        changeOrigin: true,
        secure: false,
      },
      '/courses': {
        target: 'https://back-end-superlearnerv1.onrender.com/courses/getCourse',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/courses/, '/courses'),
      },
    },
  },
  preview: {
    open: true,
    host: '0.0.0.0',  // Asegura que el modo de previsualización también esté disponible
    port: process.env.PORT || 3000  // Usa el puerto de la variable de entorno o 3000 como fallback
  }
});
