import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: "**/*.jsx"
  })],

  server: {
    watch: {
      usePolling: true
    },
    host: '172.22.239.196', // listen on all addresses
    port: 3000, // use port 3000
  },

})
