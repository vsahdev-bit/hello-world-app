/**
 * End-to-End Tests for Greeting Functionality
 */

const { test, expect } = require('@playwright/test');

test.describe('Greeting Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display greeting on button click', async ({ page }) => {
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    await button.click();
    
    // Message should not be empty
    const text = await message.textContent();
    expect(text).not.toBe('');
    expect(text.length).toBeGreaterThan(0);
  });

  test('should cycle through different greetings', async ({ page }) => {
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    const greetings = new Set();
    
    // Click 10 times to collect different greetings
    for (let i = 0; i < 10; i++) {
      await button.click();
      const text = await message.textContent();
      greetings.add(text);
      await page.waitForTimeout(100);
    }
    
    // Should have at least 8 different greetings
    expect(greetings.size).toBeGreaterThanOrEqual(8);
  });

  test('should show greeting with emoji', async ({ page }) => {
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    await button.click();
    
    const text = await message.textContent();
    // Should contain emoji (checking for common emoji characters)
    expect(text).toMatch(/[\u{1F300}-\u{1F9FF}]/u);
  });

  test('should animate message on click', async ({ page }) => {
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    await button.click();
    
    // Check if animation is applied
    const animation = await message.evaluate(el => 
      window.getComputedStyle(el).animation
    );
    
    expect(animation).toContain('fadeIn');
  });

  test('should handle rapid clicks', async ({ page }) => {
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    // Rapid click 5 times
    for (let i = 0; i < 5; i++) {
      await button.click();
    }
    
    // Should still display a greeting
    const text = await message.textContent();
    expect(text.length).toBeGreaterThan(0);
  });

  test('button should have hover effect', async ({ page }) => {
    const button = page.locator('#greetBtn');
    
    // Get initial position
    const initialBox = await button.boundingBox();
    
    // Hover over button
    await button.hover();
    
    // Should have transform (visual feedback)
    const transform = await button.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    
    // Transform should not be 'none'
    expect(transform).not.toBe('none');
  });
});

test.describe('Greeting Languages', () => {
  test('should include English greeting', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    // Click until we find English
    let found = false;
    for (let i = 0; i < 10; i++) {
      await button.click();
      const text = await message.textContent();
      if (text.includes('Hello, World!')) {
        found = true;
        break;
      }
    }
    
    expect(found).toBe(true);
  });

  test('should include Spanish greeting', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    // Click until we find Spanish
    let found = false;
    for (let i = 0; i < 10; i++) {
      await button.click();
      const text = await message.textContent();
      if (text.includes('Hola, Mundo!')) {
        found = true;
        break;
      }
    }
    
    expect(found).toBe(true);
  });

  test('should include French greeting', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('#greetBtn');
    const message = page.locator('#message');
    
    // Click until we find French
    let found = false;
    for (let i = 0; i < 10; i++) {
      await button.click();
      const text = await message.textContent();
      if (text.includes('Bonjour, Monde!')) {
        found = true;
        break;
      }
    }
    
    expect(found).toBe(true);
  });
});
