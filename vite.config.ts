import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@chakra-ui/react'],
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api/v1': {
        target: 'https://spb.pndsdn.tech/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      pages: '/src/pages',
      widgets: '/src/widgets',
      features: '/src/features',
      entities: '/src/entities',
      shared: '/src/shared',
    },
  },
});
