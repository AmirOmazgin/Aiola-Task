// @ts-check
const { test, expect } = require('@playwright/test');
const { clickActiveSlideWithHref } = require('../functions/ChooseMovie');

test('Launch movie', async ({ page }) => {
  await page.goto('https://www.nationalgeographic.com/');
  await expect(page.getByRole('heading', { name: 'Latest Stories' }).nth(1)).toBeVisible({ timeout: 10000 });
  const movieName = 'the-rise-and-fall-of-the-maya'
  const hrefContains = `https://www.nationalgeographic.com/tv/shows/${movieName}`; 
  await clickActiveSlideWithHref(page, hrefContains);
});
