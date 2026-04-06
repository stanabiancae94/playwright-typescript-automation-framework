import { Page, Locator } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator; // Changed from userNameInput to usernameInput (standard naming)
	readonly passwordInput: Locator;
	readonly loginButton: Locator; // Changed from logInButton to loginButton

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.locator('[data-test="username"]');
		this.passwordInput = page.locator('[data-test="password"]');
		this.loginButton = page.locator('[data-test="login-button"]');
	}

	/**
	 * Navigates to the login page using the baseURL from playwright.config.ts
	 */
	async navigate(): Promise<void> {
		await this.page.goto('/');
	}

	/**
	 * Performs login operation.
	 * Uses environment variables by default with hardcoded fallbacks.
	 */
	async login(
		username: string = process.env.STANDARD_USER || 'standard_user',
		password: string = process.env.PASSWORD || 'secret_sauce',
	): Promise<void> {
		// Wait for the page to be ready
		await this.usernameInput.waitFor({ state: 'visible' });

		// Clear inputs before filling (Best practice to avoid prepending text)
		await this.usernameInput.fill(username);
		await this.passwordInput.fill(password);

		await this.loginButton.click();
	}
}
