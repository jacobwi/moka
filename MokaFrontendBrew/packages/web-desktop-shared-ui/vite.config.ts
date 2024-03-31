import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import tailwindcss from "tailwindcss";

import { glob } from "glob";
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      "@moka/core": resolve(__dirname, "packages/core/src"),
      "@moka/errors": resolve(__dirname, "packages/errors/src"),
      "@moka/ui-utils": resolve(__dirname, "../ui-utils/src"),
      "@moka/web-desktop-shared-ui": resolve(
        __dirname,
        "packages/web-desktop-shared-ui/src"
      ),
      // Add more aliases as needed
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/entrypoint.ts"),
      name: "web-desktop-shared-ui",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      input: Object.fromEntries(
        glob
          .sync("lib/**/*.{ts,tsx}", { ignore: "lib/**/*.stories.tsx" })
          .map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
