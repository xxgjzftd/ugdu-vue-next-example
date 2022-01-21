import { argv } from "process";

import { Processor } from "@ugdu/processor";
import { serve, build } from "@ugdu/packer";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

const task = new Processor().task(build);

task.hook("get-config", () => {
  return {
    extensions: ["vue", "ts", "js"],
    apps: [
      {
        name: "@xx/container",
        packages(lps) {
          return lps.map((lp) => lp.name);
        },
      },
    ],
    routes: {
      container: {
        patterns: "packages/*/src/pages/**/*.vue",
        base: "/",
        depth: 1,
        extends: [
          {
            id: "packages/layout/src/pages/layout.vue",
            path: "/",
            depth: 0,
          },
        ],
      },
    },
    meta: "local",
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "${resolve(__dirname, 'packages')}/container/src/element-variables.scss" as *;`,
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
