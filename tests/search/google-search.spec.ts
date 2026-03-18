import { test, expect } from "@playwright/test"

test('Google検索-> playwright', async ({ page }) => {
    await page.goto("https://duckduckgo.com")  ;

    const keywordForm = page.getByRole('combobox');
    await keywordForm.fill('playwright');
    
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/.*playwright.*/);
})