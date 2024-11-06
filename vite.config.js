import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

// vite.config.js
export default defineConfig({
  root: './',
  base: '/',
  plugins: [eslintPlugin({ cache: false })],
  server: {
    host: 'localhost',
    port: 3000,
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/main.js'),
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        compact: true,
      },
    },
  },
  optimizeDeps: {
    include: ['flatpickr', 'gsap', 'choices.js'],
  },
})
