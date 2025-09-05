import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    //include: ["**/*.test.{js,jsx,ts,tsx}"], // Optional: define file patterns to include tests
    css: {
      modules: {
        scopeBehaviour: "local",
        generateScopedName: "[local]", // This will keep the class names as-is in tests
      },
    },
  },
});

