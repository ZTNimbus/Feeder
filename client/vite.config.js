import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api/current": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/current/, "/api/current"),
      },

      "/api/logout": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/logout/, "/api/logout"),
      },

      "/api/stripe": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stripe/, "/api/stripe"),
      },

      "/auth/google": {
        target: "http://localhost:3000/",
        // changeOrigin: true, don't set this because it breaks redirects
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      "/api/surveys": {
        target: "http://localhost:3000",
        // changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/surveys/, "/api/surveys"),
      },
    },
  },
});
