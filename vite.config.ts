import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 3001,
  },

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes(
              "node_modules"
            )
          ) {
            if (
              id.includes(
                "react"
              )
            ) {
              return "react";
            }

            if (
              id.includes(
                "react-router"
              )
            ) {
              return "router";
            }

            if (
              id.includes(
                "lucide-react"
              ) ||
              id.includes(
                "react-hot-toast"
              )
            ) {
              return "ui";
            }

            return "vendor";
          }
        },
      },
    },
  },
});