import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Make test globals available
    environment: "jsdom", // Simulate a browser-like environment for testing
    include: [
      "packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}", // Adjust if needed
    ],
    // ... other common options like reporters, coverage, etc.
  },
});
