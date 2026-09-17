// Our shared Vite/TanStack Start config already wires up tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, cloudflare (build-only), VITE_* env injection, the @ path
// alias, and React/TanStack dedupe. Don't re-add any of those here directly, it'll
// double up plugins and break the build. Extra config goes through
// defineConfig({ vite: { ... } }) instead.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this; wrangler.jsonc's main field alone isn't enough.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
