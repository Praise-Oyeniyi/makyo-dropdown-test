import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library'
  
  if (isLibrary) {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          include: ['src/components/**/*', 'src/utilities/**/*'],
          exclude: ['src/stories/**/*', 'src/**/*.stories.*']
        })
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'AdvancedDropdownComponent',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'esm' : 'js'}`
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'lucide-react'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'lucide-react': 'LucideReact'
            }
          }
        },
        sourcemap: true,
        emptyOutDir: true
      },
      css: {
        postcss: {
          plugins: []
        }
      }
    }
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      postcss: {
        plugins: []
      }
    }
  }
})