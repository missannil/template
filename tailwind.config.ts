import { preset } from "miniprogram-tailwind-preset";
import type { Config } from "tailwindcss";
import * as plugin from "tailwindcss/plugin";

export default {
  content: ["miniprogram/**/*.{wxml,ts}"],
  presets: [preset],
  plugins: [
    plugin.default(function({ addUtilities, addComponents, theme }) {
      addUtilities({
        ".primary": {
          color: theme("colors.green[600]"),
        },
        ".primary-dark": {
          color: theme("colors.green[700]"),
        },
        ".bg-primary": {
          backgroundColor: theme("colors.green[600]"),
        },
        ".bg-primary-dark": {
          backgroundColor: theme("colors.green[700]"),
        },
        ".border-primary": {
          borderColor: theme("colors.green[600]"),
        },
        ".border-primary-dark": {
          borderColor: theme("colors.green[700]"),
        },
        ".content": {
          "--tw-content": "''",
        },
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".aspect-2": {
          "aspect-ratio": "2",
        },
      });

      addComponents({
        // ".ellipsis": {
        //   "white-space": "nowrap",
        //   overflow: "hidden",
        //   "text-overflow": "ellipsis",
        // },
      });
    }),
  ],
} as Config;
