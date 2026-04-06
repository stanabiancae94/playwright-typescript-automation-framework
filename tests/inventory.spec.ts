import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { SortOptions } from '../utils/constants';
import { LoginPage } from '../pages/LoginPage';
// Import cumulat
test('Utilizatorul poate sorta produsele dupa pret (Low to High)', async ({
	page,
}) => {
	const loginPage = new LoginPage(page);
	const inventoryPage = new InventoryPage(page);

	await loginPage.navigate();
	await loginPage.logIn('standard_user', 'secret_sauce');

	await inventoryPage.clickSortProducts(SortOptions.PRICE_LOW_TO_HIGH);
	const prices = await inventoryPage.getAllPrices();
	const sortedPrices = [...prices].sort((a, b) => a - b);
	expect(prices).toEqual(sortedPrices);
});

// test('Utilizatorul poate aduga items in cos', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const inventoryPage = new InventoryPage(page);
//     await loginPage.navigate();
//     await loginPage.logIn('standard_user', 'secret_sauce');
//     await inventoryPage.addItemToCart("Sauce Labs Bike Light");
//     await inventoryPage.addItemToCart("Sauce Labs Bolt T-Shirt");
//     await inventoryPage.addItemToCart("Sauce Labs Bolt T-Shirt");
// });

test('Utilizatorul verifica Details order page', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const inventoryPage = new InventoryPage(page);
	await loginPage.navigate();
	await loginPage.logIn('standard_user', 'secret_sauce');

	const productsName = [
		'Sauce Labs Bike Light',
		'Sauce Labs Bolt T-Shirt',
		'Sauce Labs Fleece Jacket',
	];
	const capturedProductsInitial: { name: string; price: string }[] = [];

	for (const name of productsName) {
		const price = await inventoryPage.getProductPrice(name);
		capturedProductsInitial.push({ name: name, price: price });
		await inventoryPage.addItemToCart(name);
	}

	await inventoryPage.clickOnCartButton();

	const capturedProductsDetails: { name: string; price: string }[] = [];
	for (const name of productsName) {
		const price = await inventoryPage.getProductPrice(name);
		capturedProductsDetails.push({ name: name, price: price });
	}

	expect(capturedProductsInitial).toEqual(capturedProductsDetails);

	// expect(JSON.stringify(actualProducts)).toBe(JSON.stringify(expectedProducts));
});
