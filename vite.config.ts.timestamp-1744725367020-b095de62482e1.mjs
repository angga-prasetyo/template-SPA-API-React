// vite.config.ts
import path from 'path';

import pluginPurgeCss from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/@mojojoejo/vite-plugin-purgecss/dist/index.mjs';
import react from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/@vitejs/plugin-react-swc/index.mjs';
import {
  defineConfig,
  loadEnv,
} from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/vite/dist/node/index.js';
import { compression } from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/vite-plugin-compression2/dist/index.mjs';
import { ViteImageOptimizer } from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/vite-plugin-image-optimizer/dist/index.mjs';
import svgr from 'file:///Users/hzd/Documents/projects/gaming/react-spa-ts-template/node_modules/vite-plugin-svgr/dist/index.js';
var __vite_injected_original_dirname =
  '/Users/hzd/Documents/projects/gaming/react-spa-ts-template';
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };
  return defineConfig({
    optimizeDeps: {
      include: ['antd', 'react-router'],
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
      ViteImageOptimizer(),
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$/, /\.(gz)$/],
      }),
      pluginPurgeCss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__vite_injected_original_dirname, './src'),
      },
    },
    server: {
      port: 3e3,
      open: true,
    },
    preview: {
      port: 3e3,
      open: true,
    },
    build: {
      minify: 'esbuild',
      outDir: './build',
      sourcemap: true,
    },
    define: processEnvValues,
  });
};
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaHpkL0RvY3VtZW50cy9wcm9qZWN0cy9nYW1pbmcvcmVhY3Qtc3BhLXRzLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaHpkL0RvY3VtZW50cy9wcm9qZWN0cy9nYW1pbmcvcmVhY3Qtc3BhLXRzLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9oemQvRG9jdW1lbnRzL3Byb2plY3RzL2dhbWluZy9yZWFjdC1zcGEtdHMtdGVtcGxhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHBsdWdpblB1cmdlQ3NzIGZyb20gJ0Btb2pvam9lam8vdml0ZS1wbHVnaW4tcHVyZ2Vjc3MnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGNvbXByZXNzaW9uIH0gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24yJztcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogeyBtb2RlOiBzdHJpbmcgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgY29uc3QgcHJvY2Vzc0VudlZhbHVlcyA9IHtcbiAgICAncHJvY2Vzcy5lbnYnOiBPYmplY3QuZW50cmllcyhlbnYpLnJlZHVjZSgocHJldiwgW2tleSwgdmFsXSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2tleV06IHZhbCxcbiAgICAgIH07XG4gICAgfSwge30pLFxuICB9O1xuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogWydhbnRkJywgJ3JlYWN0LXJvdXRlciddLFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIHN2Z3Ioe1xuICAgICAgICBzdmdyT3B0aW9uczoge1xuICAgICAgICAgIC8vIHN2Z3Igb3B0aW9uc1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoKSxcbiAgICAgIGNvbXByZXNzaW9uKHtcbiAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxuICAgICAgICBleGNsdWRlOiBbL1xcLihicikkLywgL1xcLihneikkL10sXG4gICAgICB9KSxcbiAgICAgIHBsdWdpblB1cmdlQ3NzKCksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogMzAwMCxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICAgIG91dERpcjogJy4vYnVpbGQnLFxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgIH0sXG4gICAgZGVmaW5lOiBwcm9jZXNzRW52VmFsdWVzLFxuICB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdXLE9BQU8sVUFBVTtBQUVqWCxPQUFPLG9CQUFvQjtBQUMzQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUywwQkFBMEI7QUFDbkMsT0FBTyxVQUFVO0FBUGpCLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBd0I7QUFDN0MsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sbUJBQW1CO0FBQUEsSUFDdkIsZUFBZSxPQUFPLFFBQVEsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU07QUFDOUQsYUFBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0gsQ0FBQyxHQUFHLEdBQUc7QUFBQSxNQUNUO0FBQUEsSUFDRixHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ1A7QUFFQSxTQUFPLGFBQWE7QUFBQSxJQUNsQixjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsUUFBUSxjQUFjO0FBQUEsSUFDbEM7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxRQUNILGFBQWE7QUFBQTtBQUFBLFFBRWI7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELG1CQUFtQjtBQUFBLE1BQ25CLFlBQVk7QUFBQSxRQUNWLFdBQVc7QUFBQSxRQUNYLFNBQVMsQ0FBQyxXQUFXLFNBQVM7QUFBQSxNQUNoQyxDQUFDO0FBQUEsTUFDRCxlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
