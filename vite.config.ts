import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo under https://<user>.github.io/hw1/,
// so built asset URLs need the /hw1/ prefix there. Locally they live at /.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/hw1/' : '/',
  plugins: [react(), tailwindcss()],
});
