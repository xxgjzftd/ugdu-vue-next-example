import { argv } from 'process'
import { resolve } from 'path'

import { Processor } from '@ugdu/processor'
import { serve, build } from '@ugdu/packer'
import vue from '@vitejs/plugin-vue'

const task = new Processor().task(build)

task.hook(
  'get-config',
  () => {
    return {
      extensions: ['vue', 'ts', 'js'],
      apps: [
        {
          name: '@xx/container',
          packages (lps) {
            return lps.map((lp) => lp.name)
          }
        }
      ],
      routes: {
        container: {
          patterns: 'packages/*/src/pages/**/*.vue',
          base: '/',
          depth: 1,
          extends: [
            {
              id: 'packages/layout/src/pages/layout.vue',
              path: '/',
              depth: 0
            }
          ]
        }
      },
      meta: 'local',
      vite: {plugins: [vue()]}
    }
  }
)

task.run()
