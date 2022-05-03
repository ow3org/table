import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },

  optimizeDeps: {
    exclude: ['vue-demi'],
  },

  plugins: [
    Vue({
      reactivityTransform: true, // https://vuejs.org/guide/extras/reactivity-transform.html
    }),

    Unocss({
      mode: 'vue-scoped',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', '@vueuse/core', {
        '~/composables/dark': ['isDark', 'toggleDark'],
        '~/composables/search': ['search', 'getSearchClient'],
      }],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'my-awesome-vue-component-lib',
      fileName: format => `my-awesome-vue-component-lib.${format}.js`,
    },

    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        // exports: 'named',
        globals: {
          'vue': 'Vue',
          'vue-demi': 'vue-demi',
        },
      },
    },

    sourcemap: true,
    minify: false,
  },

  test: {
    include: ['tests/**/*.test.ts'],
    // environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },
}

// https://vitejs.dev/config
export default defineConfig(({ command }) => {
  if (command === 'serve')
    return config

  // command === 'build'
  return config
})
