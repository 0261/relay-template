import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';
import relay from 'vite-plugin-relay-lite';
import checker from "vite-plugin-checker";
import { environment } from './src/lib/environment';

const define = new Map<string, string>();

Object.entries(environment).map(([key, value]) => {
  define.set(`process.env.${key}`, JSON.stringify(value));
});


export default defineConfig({
  server: { port: 8080 },
  build: {
    cssCodeSplit: false,
    minify: "terser",
    target: ["chrome64", "safari13"],
  },
  define: Object.fromEntries(define),
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    vanillaExtractPlugin({
      esbuildOptions: {
        external: ['@seed-design'],
      },
    }),
    relay(),
  ],
});
