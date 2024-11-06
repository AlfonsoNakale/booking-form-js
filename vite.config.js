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
      input: resolve(__dirname, 'src/app.js'),
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        compact: true,
        globals: {
          jquery: '$',
          flatpickr: 'flatpickr',
          gsap: 'gsap',
          'choices.js': 'Choices',
        },
      },
      external: ['jquery'],
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  optimizeDeps: {
    include: ['flatpickr', 'gsap', 'choices.js'],
  },
})
