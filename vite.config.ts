import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          cases: resolve(__dirname, 'cases.html'),
          'case-warehouse': resolve(__dirname, 'case-warehouse.html'),
          'case-payment': resolve(__dirname, 'case-payment.html'),
          'case-mall': resolve(__dirname, 'case-mall.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
