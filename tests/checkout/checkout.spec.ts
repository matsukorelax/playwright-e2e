import { test, expect } from '@playwright/test';


test.describe('購入フロー', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');     
        await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);                                                                                       await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
        await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);                                                   
        await page.click('#login-button');
         
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
    });

    test('購入完了まで', async ({ page }) => {
        const add_button = page.getByRole('button', { name : ("Add to cart")}) 
            .and(page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'));
        
        await add_button.click();
        
        const cart_icon = page.locator('[data-test="shopping-cart-link"]');
        await cart_icon.click();
        

        const checkout_btn = page.getByRole("button", { name : 'Checkout'});
        await checkout_btn.click();
        
        const input_firstname = await page.locator('[data-test="firstName"]').fill(process.env.FIRST_NAME!);
        const input_lastname = await page.locator('[data-test="lastName"]').fill(process.env.LAST_NAME!);
        const input_postal_code = await page.locator('[data-test="postalCode"]').fill(process.env.POSTAL!);

        const continue_btn = await page.locator('[data-test="continue"]').click();

        const finish_btn = await page.getByRole('button', { name : "Finish"}).click();
       

        const thanks_msg = page.locator('[data-test="complete-header"]');
        await expect(thanks_msg).toHaveText('Thank you for your order!');
    });
});