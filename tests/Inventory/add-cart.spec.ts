import { test, expect } from "@playwright/test";

test("inventoryページで商品をカートに追加", async ({ page }) => {
    const url = process.env.BASE_URL;
    if (!url) throw new Error("BASE_URL is required");
    if (!process.env.SAUCEDEMO_USERNAME) throw new Error("SAUCEDEMO_USERNAME is required");
    if (!process.env.SAUCEDEMO_PASSWORD) throw new Error("SAUCEDEMO_PASSWORD is required");

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const idForm = page.locator("[data-test='username']");
    await idForm.fill(process.env.SAUCEDEMO_USERNAME);

    const passForm = page.locator("[data-test='password']");
    await passForm.fill(process.env.SAUCEDEMO_PASSWORD);

    await page.locator("#login-button").click();

    await expect(page).toHaveURL(/.*inventory\.html/);

    const addBtns = page.getByRole("button", { name: "Add to cart" });
    const count = await addBtns.count();
    while (await addBtns.count() > 0) {
        await addBtns.first().click();
    }

    await expect(page.locator(".shopping_cart_badge")).toHaveText(String(count));
});
