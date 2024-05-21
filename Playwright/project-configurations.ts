import { devices, Project } from '@playwright/test';
import { basename, resolve } from 'path';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { readdirSync, readFileSync } from 'node:fs';

dotenv.config();
dotenv.config({ path: '../../.env' });

global.PW_ENV = process.env.PW_ENV || 'local';

function getUrls(): Record<string, string> {


	return {
		baseURL: `https://playwright.dev`,
	};
}

const { ...urls } = getUrls();

export const buildProjectsFor = (environment: string): Project[] => {
	const viewport = { width: 1620, height: 980 };

	return [
		{
			name: `${environment}-chrome`,
			use: {
				...urls,
				...devices['Desktop Chrome'],
				viewport,
				isMobile: false,
			},
		},
		{
			name: `${environment}-safari`,
			use: {
				...urls,
				...devices['Desktop Safari'],
				viewport,
				isMobile: false,
			},
		},
		{
			name: `${environment}-firefox`,
			use: {
				...urls,
				...devices['Desktop Firefox'],
				viewport,
				isMobile: false,
			},
		},
		{
			name: `${environment}-mobile`,
			grepInvert: /@onlyDesktop/,
			use: {
				...urls,
				...devices['iPhone 14 Pro'],
				isMobile: true,
			},
		},
	];
};

export const buildProjectsForPipeline = (): Project[] => {
	const files = readdirSync(resolve(process.cwd()));
	const txtFiles = files.filter(file => file.endsWith('.txt'));
	const browser = process.env.BROWSER || 'Chrome';

	return txtFiles.map(file => {
		const baseName = basename(file, '.txt');
		const [, , device, number] = baseName.split('_');
		const deviceConfig = device === 'desktop' ? devices[`Desktop ${browser}`] : devices['iPhone 14 Pro'];
		const projectName = `${device}-${number}`;

		const content = readFileSync(resolve(process.cwd(), file), 'utf-8');
		const testMatch = JSON.parse(content);

		return {
			name: projectName,
			testMatch,
			use: {
				...urls,
				...deviceConfig,
				isMobile: device === 'mobile',
				viewport: device === 'desktop' ? { width: 1620, height: 980 } : deviceConfig.viewport,
			},
		};
	});
};
