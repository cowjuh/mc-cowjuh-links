import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: ["./src/project/reactExplained.ts", "./src/project/chatgpt.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
