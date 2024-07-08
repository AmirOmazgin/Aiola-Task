const { expect } = require('@playwright/test');

export const clickActiveSlideWithHref = async (page, hrefContains) => {
    let activeSlide = await page.$(`.SwiperSlide--active [href*="${hrefContains}"]`);

    while (!activeSlide) {
        await page.getByRole('button', { name: 'next' }).click({ force: true });
        await page.waitForTimeout(500);
        activeSlide = await page.$(`.SwiperSlide--active [href*="${hrefContains}"]`);
    }

    if (activeSlide) {
        const isActive = await activeSlide.evaluate(element => {
            return element.classList.contains('SwiperSlide--active') && element.getAttribute('data-active') === 'true';
        });
        const hrefValue = await activeSlide.evaluate(element => element.getAttribute('href'));
        console.log(`isActive: ${isActive}, hrefContains: ${hrefValue.includes(hrefContains)}`);
        if (hrefValue.includes(hrefContains)) {
            await activeSlide.click()
            await page.getByRole('button', { name: 'Reject All' }).click()
            await expect(page.locator('span.typeface-js-selected-text', { hasText: 'NATGEOTV.COM' })).toBeVisible({ timeout: 3000 });
        } else {
            console.log('Active slide found, but does not meet criteria. Check isActive and hrefContains.');
        }
    } else {
        console.error(`Desired element not found with href containing "${hrefContains}".`);
    }
}