import { test, expect } from '@playwright/test';

test('正常ログイン: standard_user でログインし inventory ページへ遷移する', async ({ page }) => {
  await page.goto('/');

  await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
  await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);
  await page.click('#login-button');

  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});
