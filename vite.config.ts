import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Match the output directory the previous CRA setup produced, so any
    // deploy pipeline configured against `build/` keeps working.
    outDir: 'build',
    sourcemap: false,
  },
  server: {
    port: 3000,
    host: true,
  },
});
