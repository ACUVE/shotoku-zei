import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
	plugins: [react(), TanStackRouterVite(), wasm(), topLevelAwait()],
	server: {
		port: 3000,
	},
});
