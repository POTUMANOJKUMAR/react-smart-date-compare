import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Docs site build — NOT the library build
// - For GitHub Pages: npm run build:docs  (base = /react-smart-date-compare/)
// - For local serve:  npm run build:docs:local  (base = /)
const isLocal = process.env.BUILD_TARGET === 'local';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: isLocal ? '/' : '/react-smart-date-compare/',
    build: {
        outDir: 'maindist-doc',
    },
});
