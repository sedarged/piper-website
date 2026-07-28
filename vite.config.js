import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // keep the vendor chunk separate from app code so a content update
    // (which changes constantly) doesn't invalidate the React runtime
    // cache (which almost never changes) for returning visitors
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
