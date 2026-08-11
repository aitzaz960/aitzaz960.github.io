import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works whether it is served from
// aitzaz960.github.io/ or aitzaz960.github.io/portfolio/.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
