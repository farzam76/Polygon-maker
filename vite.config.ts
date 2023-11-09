/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "react/jsx-runtime.js": "react/jsx-runtime",
      "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
    },
  },
  plugins: [react(), tsconfigPaths(), eslint(), dts()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ".vitest/setup",
    include: ["**/test.{ts,tsx}"],
  },
});
