/**
 * End-to-End Tests for Responsive Design
 */

const { test, expect } = require('@playwright/test');

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // Container should not overflow
    const containerWidth = await container.evaluate(el => el.offsetWidth);
    expect(containerWidth).toBeLessThanOrEqual(375);
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // Container should have max-width on large screens
    const containerWidth = await container.evaluate(el => el.offsetWidth);
    expect(containerWidth).toBeLessThanOrEqual(600);
  });

  test('button should be clickable on touch devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const button = page.locator('#greetBtn');
    await button.tap();
    
    const message = page.locator('#message');
    const text = await message.textContent();
    expect(text.length).toBeGreaterThan(0);
  });
});
