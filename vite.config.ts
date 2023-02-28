import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: ["./src/project/project1.ts", "./src/project/project2.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
