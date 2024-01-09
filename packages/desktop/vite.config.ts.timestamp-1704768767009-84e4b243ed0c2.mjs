// vite.config.ts
import { resolve } from "node:path";
import { eruda } from "file:///C:/Users/Nawb/Workspace/publish/packages/dev/src/index.js";
import { vanillaExtractPlugin } from "file:///C:/Users/Nawb/Workspace/publish/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import react from "file:///C:/Users/Nawb/Workspace/publish/node_modules/@vitejs/plugin-react-swc/index.mjs";
import million from "file:///C:/Users/Nawb/Workspace/publish/node_modules/million/dist/packages/compiler.mjs";
import { defineConfig } from "file:///C:/Users/Nawb/Workspace/publish/packages/desktop/node_modules/vite/dist/node/index.js";
import mkcert from "file:///C:/Users/Nawb/Workspace/publish/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var __vite_injected_original_dirname = "C:\\Users\\Nawb\\Workspace\\publish\\packages\\desktop";
var enableRemoteDebug = process.env.ENABLE_REMOTE_DEBUG === "true";
var vite_config_default = defineConfig({
  plugins: [
    eruda({ debug: enableRemoteDebug }),
    mkcert(),
    million.vite({ auto: true }),
    react({ plugins: [["@swc-jotai/react-refresh", {}]] }),
    vanillaExtractPlugin()
  ],
  envDir: resolve(__vite_injected_original_dirname, "../../"),
  clearScreen: false,
  server: {
    port: 3e3,
    host: "0.0.0.0",
    strictPort: true
  },
  resolve: {
    alias: {
      "~": resolve(__vite_injected_original_dirname, "./src")
    }
  },
  envPrefix: ["VITE_", "TAURI_"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxOYXdiXFxcXFdvcmtzcGFjZVxcXFxwdWJsaXNoXFxcXHBhY2thZ2VzXFxcXGRlc2t0b3BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXE5hd2JcXFxcV29ya3NwYWNlXFxcXHB1Ymxpc2hcXFxccGFja2FnZXNcXFxcZGVza3RvcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTmF3Yi9Xb3Jrc3BhY2UvcHVibGlzaC9wYWNrYWdlcy9kZXNrdG9wL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmltcG9ydCB7IGVydWRhIH0gZnJvbSAnQHB1Ymxpc2gvZGV2JztcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbic7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBtaWxsaW9uIGZyb20gJ21pbGxpb24vY29tcGlsZXInO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5cbmNvbnN0IGVuYWJsZVJlbW90ZURlYnVnID0gcHJvY2Vzcy5lbnYuRU5BQkxFX1JFTU9URV9ERUJVRyA9PT0gJ3RydWUnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBlcnVkYSh7IGRlYnVnOiBlbmFibGVSZW1vdGVEZWJ1ZyB9KSxcbiAgICBta2NlcnQoKSxcbiAgICBtaWxsaW9uLnZpdGUoeyBhdXRvOiB0cnVlIH0pLFxuICAgIHJlYWN0KHsgcGx1Z2luczogW1snQHN3Yy1qb3RhaS9yZWFjdC1yZWZyZXNoJywge31dXSB9KSxcbiAgICB2YW5pbGxhRXh0cmFjdFBsdWdpbigpLFxuICBdLFxuICBlbnZEaXI6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vJyksXG4gIGNsZWFyU2NyZWVuOiBmYWxzZSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnfic6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBlbnZQcmVmaXg6IFsnVklURV8nLCAnVEFVUklfJ10sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1YsU0FBUyxlQUFlO0FBRXhXLFNBQVMsYUFBYTtBQUN0QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQVBuQixJQUFNLG1DQUFtQztBQVN6QyxJQUFNLG9CQUFvQixRQUFRLElBQUksd0JBQXdCO0FBRTlELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU0sRUFBRSxPQUFPLGtCQUFrQixDQUFDO0FBQUEsSUFDbEMsT0FBTztBQUFBLElBQ1AsUUFBUSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxJQUMzQixNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQ3JELHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxRQUFRLFFBQVEsa0NBQVcsUUFBUTtBQUFBLEVBQ25DLGFBQWE7QUFBQSxFQUNiLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVyxDQUFDLFNBQVMsUUFBUTtBQUMvQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
