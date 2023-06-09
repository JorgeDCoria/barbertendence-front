import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@mui': '@material-ui',
      // '@mui/icons-material': '@material-ui/icons-material'
      '@/utilities': '/src/utilities',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
})
