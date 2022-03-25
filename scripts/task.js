import { argv } from "process";

import { Processor } from "@ugdu/processor";
import { serve, build } from "@ugdu/packer";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

const arg = argv[2] || 'local'
const task = new Processor().task(['local', 'qa', 'prod'].includes(arg) ? build : serve)

task.hook("get-config", () => {
  return {
    extensions: ["vue", "ts", "js"],
    apps: [
      {
        name: "@xx/container",
        packages(lps) {
          return lps.map((lp) => lp.name);
        }
      }
    ],
    meta: "local",
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "${resolve('packages')}/container/src/element-variables.scss" as *;`,
          },
        },
      },
      plugins: [
        vue(),
        Components({
          dts: "./packages/container/components.d.ts",
          resolvers: [
            ElementPlusResolver({
              importStyle: "sass",
            }),
          ],
        }),
        AutoImport({
          dts: "./packages/container/auto-imports.d.ts",
          imports: ["vue"],
        }),
      ],
    },
  };
});

task.run();
