import { test, expect } from '@playwright/test';

import { baseUrl } from 'e2e/constants';

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test('Show Homepage', async ({ page }) => {
  await expect(page).toHaveTitle(/Home/);
  await expect(page.getByRole('heading', { name: /Homepage/ })).toBeVisible();
});
