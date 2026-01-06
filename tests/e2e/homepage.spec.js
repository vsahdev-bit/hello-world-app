/**
 * End-to-End Tests for Homepage
 */

const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Hello World App');
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1.title');
    await expect(heading).toHaveText('Hello World! 🌍');
  });

  test('should display subtitle', async ({ page }) => {
    const subtitle = page.locator('p.subtitle');
    await expect(subtitle).toHaveText('Welcome to My First App using RovoDev CLI');
  });

  test('should display click button', async ({ page }) => {
    const button = page.locator('#greetBtn');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click Me!');
  });

  test('should have empty message initially', async ({ page }) => {
    const message = page.locator('#message');
    await expect(message).toBeVisible();
    await expect(message).toHaveText('');
  });

  test('should display feature flags panel', async ({ page }) => {
    const panel = page.locator('#featureFlagsPanel');
    await expect(panel).toBeVisible();
    
    const heading = panel.locator('h3');
    await expect(heading).toContainText('Feature Flags');
  });

  test('should load all CSS styles', async ({ page }) => {
    const container = page.locator('.container');
    const bgColor = await container.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should have white background (rgb(255, 255, 255))
    expect(bgColor).toBe('rgb(255, 255, 255)');
  });

  test('should load all JavaScript files', async ({ page }) => {
    // Check if global objects are defined
    const hasFeatureFlags = await page.evaluate(() => typeof window.featureFlags !== 'undefined');
    const hasFeatures = await page.evaluate(() => typeof window.features !== 'undefined');
    
    expect(hasFeatureFlags).toBe(true);
    expect(hasFeatures).toBe(true);
  });
});
