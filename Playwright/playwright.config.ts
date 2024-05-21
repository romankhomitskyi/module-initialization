import { defineConfig } from '@playwright/test';

import { buildProjectsFor, buildProjectsForPipeline } from './project-configurations';
import * as dotenv from 'dotenv';
import { TraceMode } from 'playwright/types/test';

dotenv.config();
dotenv.config({ path: '../../.env' });
const ifCI = process.env.PW_CI === 'true';
const CIRetries = Number(process.env.RETRIES || '1');
const CITrace = (process.env.PW_TRACE as TraceMode) || 'on-first-retry';


export default defineConfig({
	testDir: './src/specs',
	testMatch: '**/*.spec.ts',
	expect: { timeout: 30000 },
	reportSlowTests: { max: 10, threshold: 8 * 60 * 1000 },

	retries: ifCI ? CIRetries : 0,
	workers: Number(process.env.WORKERS),
	timeout: 8 * 60 * 1000, //this is 8 minutes
	globalTimeout: 60 * 60 * 1000, //this is 1 hour
	outputDir: ifCI ? `test-results-${process.env.SHARD_INDEX || 1}` : 'test-results',
	reporter: ifCI
		? [
				['list'],
				['github'],
				['blob', { outputDir: './blob-report', fileName: `job-${process.env.SHARD_INDEX || 1}.zip` }],
				['json', { outputDir: './json-report', fileName: `results-${process.env.SHARD_INDEX || 1}.json` }],
			]
		: [['list'], ['html']],
	use: {
		viewport: { width: 1620, height: 980 },
		actionTimeout: 30000,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		navigationTimeout: 60000,
		trace: ifCI ? CITrace : 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'off',
	},

	projects: [
		...(ifCI ? buildProjectsForPipeline() : []),
		...buildProjectsFor(process.env.PW_ENV),

	],


});
