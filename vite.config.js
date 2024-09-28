import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import sitemapPlugin from "vite-plugin-sitemap";
import { FRONT_URL } from "./URL(LINK)";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    sitemapPlugin({
      hostname: FRONT_URL || "https://shopy-gooal.netlify.app",
      dynamicRoutes: [
        "/dashboard",
        "/aboutUs",
        "/check-out",
        "/cart",
        "/wishList",
        "/account",
        "/active-orders",
        "/order-history",
        "/personal-info",
        "/login",
        "/signup",
        "/forgetPassword",
      ],
    }),
  ],
});
