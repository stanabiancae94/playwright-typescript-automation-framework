import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { SortOptions } from '../utils/constants';
import { LoginPage } from '../pages/LoginPage';

test.describe('Inventory and Cart Functionality', () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;

	// This runs before every single test
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);

		await loginPage.navigate();
		// Login uses default values from .env if not specified
		await loginPage.login();
	});

	test('should sort products by price (Low to High)', async () => {
		await inventoryPage.clickSortProducts(SortOptions.PRICE_LOW_TO_HIGH);

		const prices = await inventoryPage.getAllPrices();
		const sortedPrices = [...prices].sort((a, b) => a - b);

		expect(prices).toEqual(sortedPrices);
	});

	test('should verify product details in the cart page', async () => {
		const productNames = [
			'Sauce Labs Bike Light',
			'Sauce Labs Bolt T-Shirt',
			'Sauce Labs Fleece Jacket',
		];

		const capturedProductsInitial: { name: string; price: string }[] = [];

		// Capture initial details and add to cart
		for (const name of productNames) {
			const price = await inventoryPage.getProductPrice(name);
			capturedProductsInitial.push({ name, price });
			await inventoryPage.addItemToCart(name);
		}

		await inventoryPage.clickOnCartButton();

		// Capture details from the cart page
		const capturedProductsInCart: { name: string; price: string }[] = [];
		for (const name of productNames) {
			const price = await inventoryPage.getProductPrice(name);
			capturedProductsInCart.push({ name, price });
		}

		expect(capturedProductsInitial).toEqual(capturedProductsInCart);
	});
});
