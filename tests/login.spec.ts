import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Utilizatorul se poate loga cu succes', async ({ page }) => { 
const loginPage = new LoginPage(page)
await loginPage.navigate();
await loginPage.logIn("standard_user", "secret_sauce");
await expect(page).toHaveURL(/.*inventory.html/);
await expect(page).toHaveTitle("Swag Labs");
});

// test('get started link', async ({ page }) => {
// });
