import { defineConfig } from "vite";

const base = process.env.NODE_ENV === "production" ? "/front_lite_chapter4-1/vanilla/" : "";

export default defineConfig({ base });
