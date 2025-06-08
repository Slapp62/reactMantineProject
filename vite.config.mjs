import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
    build: {
        target: 'esnext',
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (/node_modules\/react($|\/)/.test(id)) return 'react';
                        if (/node_modules\/react-dom($|\/)/.test(id)) return 'react-dom';
                        if (id.includes('@mantine')) return 'mantine';
                        if (id.includes('framer-motion')) return 'framer-motion';
                        if (id.includes('redux')) return 'redux';
                        return 'vendor';
                    }
                },
            },
        },
    },
});
