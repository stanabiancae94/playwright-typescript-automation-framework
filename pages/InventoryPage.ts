import { Page, Locator } from '@playwright/test';
import { SortOptions } from '../utils/constants';

export class InventoryPage {
	readonly page: Page;
	readonly sortDropdown: Locator;
	readonly productPrices: Locator;
	readonly cartButton: Locator;
	readonly inventoryItem: Locator;
	// readonly cartItem: Locator;
	// readonly checkoutItem: Locator;

	constructor(page: Page) {
		this.page = page;
		this.sortDropdown = page.locator(
			'[data-test="product-sort-container"]',
		);
		this.productPrices = page.locator(
			'[data-test="inventory-item-price"]',
		);
		this.cartButton = page.locator('[data-test="shopping-cart-link"]');

		this.inventoryItem = page.locator('[data-test="inventory-item"]');
		// this.cartItem = page.locator('[data-test="cart-item"]');
		// this.checkoutItem = page.locator('[data-test="checkout-item"]');
	}

	getAddToCartButton(productName: string): Locator {
		const formattedName = productName.toLowerCase().replaceAll(' ', '-');
		return this.page.locator(
			`[data-test="add-to-cart-${formattedName}"]`,
		);
	}

	getAddToCartButton2(productName: string): Locator {
		const formattedName = productName.toLowerCase().replaceAll(' ', '-');
		return this.page.locator(
			`[data-test="add-to-cart-${formattedName}"]`,
		);
	}

	async clickSortProducts(sortKey: SortOptions): Promise<void> {
		await this.sortDropdown.selectOption(sortKey);
	}

	async getAllPrices(): Promise<number[]> {
		const priceStrings = await this.productPrices.allTextContents();
		return priceStrings.map((price) =>
			parseFloat(price.replace('$', '')),
		);
	}

	async addItemToCart(productName: string): Promise<void> {
		await this.getAddToCartButton(productName).click();
	}

	async clickOnCartButton() {
		await this.cartButton.click();
	}

	async getProductPrice(
		// location: string,
		productNameExpected: string,
	): Promise<string> {
		// let itemsLocator: Locator[];
		// if (location === 'initial') {
		const itemsLocator = await this.inventoryItem.all();
		// } else if (location === 'details') {
		// 	itemsLocator = await this.cartItem.all();
		// } else {
		// 	itemsLocator = await this.checkoutItem.all(); // pentru 'checkout'
		// }
		for (var item of itemsLocator) {
			const productNameUI = await item
				.locator('.inventory_item_name')
				.innerText();
			if (productNameExpected === productNameUI) {
				return await item
					.locator('.inventory_item_price')
					.innerText();
			}
		}

		return '';
	}

	// async getProductPriceFromDetailsPage(
	// 	locator:Locator, productNameExpected: string,
	// ): Promise<string> {
	// 	const allInventoryItems = await this.cartItem.all();
	// 	for (var item of allInventoryItems) {
	// 		const productNameUI = await item
	// 			.locator('.inventory_item_name')
	// 			.innerText();
	// 		if (productNameExpected === productNameUI) {
	// 			return await item
	// 				.locator('.inventory_item_price')
	// 				.innerText();
	// 		}
	// 	}
	// 	return '';
	// }
	//mai elegant scris
	// async getProductPriceVar2(productNameExpected: string): Promise<string> {
	// 	return await this.inventoryItem
	// 		.filter({ hasText: productNameExpected })
	// 		.locator('.inventory_item_price')
	// 		.innerText();
	// }
}
