import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import jsconfigPaths from "vite-jsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    server: {
        watch: {
            usePolling: true,
        },
    },

    // resolve: {
    //     alias: {
    //         src: path.resolve(__dirname, "src"),
    //         assets: path.resolve(__dirname, "src/assets"),
    //         components: path.resolve(__dirname, "src/components"),
    //     },
    // },
});
