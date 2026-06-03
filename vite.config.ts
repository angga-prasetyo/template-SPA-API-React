import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { compression } from 'vite-plugin-compression2';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `
          @use "@/styles/scss/variables/breakpoints" as bp;
          @use "@/styles/scss/variables/colors" as ctColor;
          @use "@/styles/scss/variables/heights" as ctHeight;
          @use "@/styles/scss/variables/widths" as ctWidth;
          @use "@/styles/scss/variables/zindexes" as ctZindex;
          @use "@/styles/scss/utils/borderRadius";
          @use "@/styles/scss/utils/margin";
          @use '@/styles/scss/utils/boxShadow';
          @use "@/styles/scss/utils/padding";
          @use "@/styles/scss/utils/others";
        `,
        },
      },
    },
    optimizeDeps: {
      include: ['antd', 'react-router-dom'],
    },
    plugins: [
      react(),
      svgr(),
      ViteImageOptimizer(),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
      open: true,
    },
    build: {
      minify: 'esbuild',
      outDir: './build',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('react/') ||
                id.includes('react-dom/') ||
                id.includes('react-router')
              ) {
                return 'vendor-react';
              }
              if (id.includes('@tanstack')) {
                return 'vendor-query';
              }
            }
          },
        },
      },
    },
    test: {
      setupFiles: './src/setupTests.ts',
      environment: 'jsdom',
      globals: true,
      testTimeout: 30000,
      hookTimeout: 30000,
      exclude: ['**/node_modules/**', '**/e2e/**'],
      coverage: {
        exclude: ['**/assets/**', '**/*.scss', '**/*.css'],
        reportsDirectory: './coverage',
      },
      server: {
        deps: {
          inline: ['antd', '@ant-design/icons', 'rc-*'],
        },
      },
    },
  });
};
