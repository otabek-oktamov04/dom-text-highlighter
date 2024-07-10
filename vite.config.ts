// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "./src/main.ts"),
      name: "highlighter",
      // the proper extensions will be added
      fileName: "highlighter",
      formats: ["es"],
    },
  },
  plugins: [dts()],
});
