import { Options } from "./plugins/twindv1.ts";
import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset],
    darkMode: "class",
  }),
  plugin: [
    '@tailwindcss/typography',
  ],
  selfURL: import.meta.url,
} as Options;
