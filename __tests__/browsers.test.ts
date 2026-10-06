import { expect, test } from '@playwright/test';

test('shows the Big Tic Tac Toe page title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Big Tic Tac Toe');
});
