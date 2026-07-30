import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    fresh({
      serverEntry: "./app/main.ts",
      clientEntry: "./app/client.ts",
      islandsDir: "./app/islands",
      routeDir: "./app/routes",
      staticDir: "./app/static",
    }),
    tailwindcss(),
  ],
});
