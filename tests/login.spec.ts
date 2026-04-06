// test('get started link', async ({ page }) => {
// });
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		await loginPage.navigate();
	});

	test('should allow a user to log in successfully with valid credentials', async ({
		page,
	}) => {
		await loginPage.login();
		await expect(page).toHaveURL(/.*inventory.html/);
		await expect(page).toHaveTitle('Swag Labs');
	});
});
