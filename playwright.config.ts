import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: [
    {
      command: "firebase emulators:start",
      port: 8080,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "FIRESTORE_EMULATOR_HOST=localhost:8080 FIREBASE_AUTH_EMULATOR_HOST=localhost:9099 FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199 npm run dev",
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
