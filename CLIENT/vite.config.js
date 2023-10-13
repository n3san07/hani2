import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteA11 from 'vite-plugin-rewrite-all' ;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteA11()],
})
