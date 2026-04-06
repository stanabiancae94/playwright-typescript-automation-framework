import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	timeout: 30 * 1000, // 30 sec per test
	expect: {
		timeout: 5000, // Max 5 sec for assertions  (ex: expect(locator).toBeVisible())
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['html', { open: 'never' }], ['list']],
	use: {
		baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		trace: 'retain-on-failure',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
