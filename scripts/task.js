import { argv } from "process";

import { Processor } from "@ugdu/processor";
import { serve, build } from "@ugdu/packer";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

const task = new Processor().task(argv[2] === 'build' || argv[2] === 'local' ? build : serve);

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
            additionalData: `@use "@container/element-variables.scss" as *;`,
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
