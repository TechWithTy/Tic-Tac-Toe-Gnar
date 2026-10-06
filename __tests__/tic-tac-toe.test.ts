import { expect, test } from '@playwright/test';

test.describe('Tic Tac Toe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('alternates turns between two players', async ({ page }) => {
    await expect(page.getByText("Player X's turn")).toBeVisible();

    await page.getByRole('button', { name: 'Square 1, empty' }).click();

    await expect(page.getByRole('button', { name: 'Square 1, X' })).toBeVisible();
    await expect(page.getByText("Player O's turn")).toBeVisible();

    await page.getByRole('button', { name: 'Square 2, empty' }).click();

    await expect(page.getByRole('button', { name: 'Square 2, O' })).toBeVisible();
    await expect(page.getByText("Player X's turn")).toBeVisible();
  });

  test('rejects moves on occupied squares and after the round is finished', async ({ page }) => {
    const square1 = page.getByRole('button', { name: 'Square 1, empty' });
    await square1.click();
    await expect(page.getByRole('button', { name: 'Square 1, X' })).toBeDisabled();

    await page.getByRole('button', { name: 'Square 4, empty' }).click();
    await page.getByRole('button', { name: 'Square 2, empty' }).click();
    await page.getByRole('button', { name: 'Square 5, empty' }).click();
    await page.getByRole('button', { name: 'Square 3, empty' }).click();

    await expect(page.getByText('Player X wins!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Square 6, empty' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Square 6, empty' })).toHaveText('');
  });

  test('detects a win', async ({ page }) => {
    await page.getByRole('button', { name: 'Square 1, empty' }).click();
    await page.getByRole('button', { name: 'Square 4, empty' }).click();
    await page.getByRole('button', { name: 'Square 2, empty' }).click();
    await page.getByRole('button', { name: 'Square 5, empty' }).click();
    await page.getByRole('button', { name: 'Square 3, empty' }).click();

    await expect(page.getByText('Player X wins!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Square 1, X' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Square 2, X' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Square 3, X' })).toBeVisible();
  });

  test('detects a draw', async ({ page }) => {
    const moves = [1, 2, 3, 5, 4, 6, 8, 7, 9];

    for (const square of moves) {
      await page.getByRole('button', { name: `Square ${square}, empty` }).click();
    }

    await expect(page.getByText("It's a draw.")).toBeVisible();
    await expect(page.getByRole('button', { name: /Square \d+, empty/ })).toHaveCount(0);
  });

  test('New game clears the board and returns the turn to Player X', async ({ page }) => {
    await page.getByRole('button', { name: 'Square 1, empty' }).click();
    await page.getByRole('button', { name: 'Square 2, empty' }).click();

    await page.getByRole('button', { name: 'New game' }).click();

    await expect(page.getByText("Player X's turn")).toBeVisible();
    await expect(page.getByRole('button', { name: /Square \d+, empty/ })).toHaveCount(9);
  });

  test('reload resets the game state', async ({ page }) => {
    await page.getByRole('button', { name: 'Square 1, empty' }).click();
    await page.getByRole('button', { name: 'Square 2, empty' }).click();

    await page.reload();

    await expect(page.getByText("Player X's turn")).toBeVisible();
    await expect(page.getByRole('button', { name: /Square \d+, empty/ })).toHaveCount(9);
  });
});
