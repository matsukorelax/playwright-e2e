import { test, expect } from '@playwright/test';

test('異常系: 誤ったユーザー名でログインするとエラーが表示される', async ({ page }) => {
  await page.goto('/');

  await page.fill('#user-name', 'wrong_user');
  await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('異常系: 誤ったパスワードでログインするとエラーが表示される', async ({ page }) => {
  await page.goto('/');

  await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('異常系: 空のユーザー名でログインするとエラーが表示される', async ({ page }) => {
  await page.goto('/');

  await page.fill('#user-name', '');
  await page.fill('#password', process.env.SAUCEDEMO_PASSWORD!);
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('異常系: 空のパスワードでログインするとエラーが表示される', async ({ page }) => {
  await page.goto('/');

  await page.fill('#user-name', process.env.SAUCEDEMO_USERNAME!);
  await page.fill('#password', '');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
});
