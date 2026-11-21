import { defineConfig } from 'vite';

export default defineConfig({
  // Relative paths
  base: './',
  build: {
    outDir: 'dist',
    // Keep images as files in assets
    assetsInlineLimit: 0,
    // Put all CSS into one file
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Predictable file names (no hashes)
        entryFileNames: 'main.js',
        chunkFileNames: 'main.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});