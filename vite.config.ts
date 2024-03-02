import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import wyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      {
        ...wyw({
          displayName: mode === "development",
          include: ["**/*.{js,jsx,ts,tsx}"],
          babelOptions: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
          },
        }),
        enforce: "pre",
      },
      react(),
      tsconfigPaths(),
      TanStackRouterVite(),
    ],
  };
});
