import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Docs site build — NOT the library build
// Used by: npm run build:docs / npm run preview:docs
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/react-smart-date-compare/', // for GitHub Pages deployment
    build: {
        outDir: 'docs-dist',
    },
});
