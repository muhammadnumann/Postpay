import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compilerOptions } from './tsconfig.json';
import { resolve } from 'path';
import graphql from '@rollup/plugin-graphql';
import svgr from "@honkhonk/vite-plugin-svgr";
import mkcert from 'vite-plugin-mkcert';

const alias = Object.entries(compilerOptions.paths).reduce(
  (acc, [key, [value]]) => {
    const aliasKey = key.substring(0, key.length - 2);
    const path = value.substring(0, value.length - 2);
    return {
      ...acc,
      [aliasKey]: resolve(__dirname, path),
    };
  },
  {}
);

// https://vitejs.dev/config/
export default defineConfig({
  //@ts-ignore
  plugins: [react(), graphql(), svgr(), mkcert()],
  alias: alias,
  server: {
    https: {
      key: './key.pem',
      cert: './cert.pem',
    },
    host: '0.0.0.0',
  }
});
