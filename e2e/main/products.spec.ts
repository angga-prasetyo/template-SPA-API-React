import { test, expect } from '@playwright/test';

import { baseUrl } from 'e2e/constants';

test.beforeEach(async ({ page }) => {
  await page.goto(`${baseUrl}/products`);
});

test('Show Products', async ({ page }) => {
  await expect(page).toHaveTitle(/Products/);
  await expect(page.getByRole('heading', { name: /Products/ })).toBeVisible();
});
