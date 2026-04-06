import { Page, Locator } from '@playwright/test';
export class LoginPage {
	readonly page: Page;
	readonly userNameInput: Locator;
	readonly passwordInput: Locator;
	readonly logInButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.userNameInput = page.locator('[data-test="username"]');
		this.passwordInput = page.locator('[data-test="password"]');
		this.logInButton = page.locator('[data-test="login-button"]');
	}

	async navigate(): Promise<void> {
		await this.page.goto('https://www.saucedemo.com/');
	}

	async logIn(
		userName: string = 'standard_user',
		password: string = 'secret_sauce',
	): Promise<void> {
		await this.userNameInput.waitFor({ state: 'visible' });
		await this.userNameInput.fill(userName);
		await this.passwordInput.fill(password);
		await this.logInButton.click();
	}
}
