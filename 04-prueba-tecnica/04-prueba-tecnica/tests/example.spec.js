// @ts-check
import { test, expect } from '@playwright/test'

const CAT_PREFIX_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173'

// TEST END TO END
test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph');
  const image = await page.getByRole('img');

  const textContent = await text.textContent();
  const imgSrc = await image.getAttribute('src');

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imgSrc?.startsWith(CAT_PREFIX_URL)).toBe(true);
});