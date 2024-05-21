import { defineConfig, devices } from '@playwright/test';



export default defineConfig({
	testDir: './src/specs',
	testMatch: '**/*.spec.ts',
	expect: { timeout: 30000 },
	reportSlowTests: { max: 10, threshold: 8 * 60 * 1000 },
	retries: 0,
	workers: 1,
	timeout: 8 * 60 * 1000, //this is 8 minutes
	globalTimeout: 60 * 60 * 1000, //this is 1 hour

	reporter: [['list'], ['html']],
	use: {
		viewport: { width: 1620, height: 980 },
		actionTimeout: 30000,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		navigationTimeout: 60000,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'off',
	},

	projects: [
		{
			name: `local-chrome`,
			use: {
				baseURL: 'https://playwright.dev',
				...devices['Desktop Chrome'],
		        viewport: { width: 1620, height: 980 },
				isMobile: false,
			},
		},
	],

});
