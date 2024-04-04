import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@moka/ui-utils": "../../packages/ui-utils/src", // Adjust the path as necessary
      "@moka/ui-components": path.resolve(
        __dirname,
        "../../packages/web-desktop-shared-ui/lib"
      ),
    },
  },
});
