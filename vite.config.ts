import { defineConfig } from 'vite'
import ViteFonts from 'unplugin-fonts/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      ViteFonts({
          fontsource: {
              families: [
                  {
                      name: 'Roboto',
                      weights: [100, 300, 400, 500, 700, 900],
                      styles: ['normal', 'italic'],
                  },
              ],
          },
      }),
      vue()
  ],
})
