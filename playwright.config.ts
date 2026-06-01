/* eslint-disable import/order */
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv/config';
dotenv;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.VITE_BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    /* setup auth */
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    /* end of setup auth */

    /* Desktop & Mobile Without Credentials */
    {
      name: 'Desktop Chrome (Without Credentials)',
      testDir: './e2e/auth',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Desktop Firefox (Without Credentials)',
      testDir: './e2e/auth',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Desktop Safari (Without Credentials)',
      testDir: './e2e/auth',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome (Without Credentials)',
      testDir: './e2e/auth',
      retries: 3,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari (Without Credentials)',
      testDir: './e2e/auth',
      retries: 3,
      use: { ...devices['iPhone 12'] },
    },
    /* End of Test against mobile viewports. */

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge (Without Credentials)',
    //   testDir: './e2e/auth',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome (Without Credentials)',
    //   testDir: './e2e/auth',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    /* End of Test against branded browsers. */

    /* End of Desktop & Mobile Without Credentials */

    /* Desktop & Mobile With Credentials */
    {
      name: 'Desktop Chrome (With Credentials)',
      testDir: './e2e/main',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/session.json',
      },
    },

    {
      name: 'Desktop Firefox (With Credentials)',
      testDir: './e2e/main',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/session.json',
      },
    },

    {
      name: 'Desktop Safari (With Credentials)',
      testDir: './e2e/main',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/session.json',
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome (With Credentials)',
      testDir: './e2e/main',
      dependencies: ['setup'],
      retries: 3,
      use: {
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/session.json',
      },
    },
    {
      name: 'Mobile Safari (With Credentials)',
      testDir: './e2e/main',
      dependencies: ['setup'],
      retries: 3,
      use: {
        ...devices['iPhone 12'],
        storageState: 'playwright/.auth/session.json',
      },
    },
    /* End of Test against mobile viewports. */

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge (With Credentials)',
    //   testDir: './e2e/main',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     storageState: 'playwright/.auth/session.json',
    //   },
    // },
    // {
    //   name: 'Google Chrome (With Credentials)',
    //   testDir: './e2e/main',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome',
    //     storageState: 'playwright/.auth/session.json',
    //   },
    // },
    /* End of Test against branded browsers. */

    /* End of Desktop & Mobile With Credentials */
  ],

  /* Run your local prod server from pnpm build before starting the tests */
  webServer: {
    command: 'pnpm serve',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
