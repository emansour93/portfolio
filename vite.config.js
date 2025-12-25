import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://rgmdevelopmentgrp.com",
        changeOrigin: true,
        secure: true, // set false if using self-signed cert
      },
    },
  },
});
