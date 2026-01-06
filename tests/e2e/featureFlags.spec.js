/**
 * End-to-End Tests for Feature Flags
 */

const { test, expect } = require('@playwright/test');

test.describe('Feature Flags Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
  });

  test('should display all feature flag checkboxes', async ({ page }) => {
    const darkMode = page.locator('#flag-darkMode');
    const confetti = page.locator('#flag-confettiEffect');
    const sound = page.locator('#flag-soundEffects');
    const animatedBg = page.locator('#flag-animatedBackground');
    const counter = page.locator('#flag-showGreetingCounter');
    
    await expect(darkMode).toBeVisible();
    await expect(confetti).toBeVisible();
    await expect(sound).toBeVisible();
    await expect(animatedBg).toBeVisible();
    await expect(counter).toBeVisible();
  });

  test('should have all flags unchecked by default', async ({ page }) => {
    const checkboxes = page.locator('[data-flag]');
    const count = await checkboxes.count();
    
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked();
    }
  });

  test('should display reset buttons', async ({ page }) => {
    const resetFlags = page.locator('text=Reset All');
    const resetCounters = page.locator('text=Reset Counters');
    
    await expect(resetFlags).toBeVisible();
    await expect(resetCounters).toBeVisible();
  });
});

test.describe('Dark Mode Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should enable dark mode when checkbox is checked', async ({ page }) => {
    const checkbox = page.locator('#flag-darkMode');
    
    await checkbox.check();
    
    // Body should have dark-mode class
    const hasDarkMode = await page.evaluate(() => 
      document.body.classList.contains('dark-mode')
    );
    
    expect(hasDarkMode).toBe(true);
  });

  test('should disable dark mode when checkbox is unchecked', async ({ page }) => {
    const checkbox = page.locator('#flag-darkMode');
    
    await checkbox.check();
    await checkbox.uncheck();
    
    const hasDarkMode = await page.evaluate(() => 
      document.body.classList.contains('dark-mode')
    );
    
    expect(hasDarkMode).toBe(false);
  });

  test('should persist dark mode across page reloads', async ({ page }) => {
    const checkbox = page.locator('#flag-darkMode');
    
    await checkbox.check();
    await page.reload();
    
    await expect(checkbox).toBeChecked();
    
    const hasDarkMode = await page.evaluate(() => 
      document.body.classList.contains('dark-mode')
    );
    
    expect(hasDarkMode).toBe(true);
  });

  test('should change background color in dark mode', async ({ page }) => {
    const body = page.locator('body');
    
    // Get original background
    const originalBg = await body.evaluate(el => 
      window.getComputedStyle(el).background
    );
    
    // Enable dark mode
    await page.locator('#flag-darkMode').check();
    
    // Get new background
    const darkBg = await body.evaluate(el => 
      window.getComputedStyle(el).background
    );
    
    // Backgrounds should be different
    expect(darkBg).not.toBe(originalBg);
  });
});

test.describe('Animated Background Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should enable animated background when checked', async ({ page }) => {
    const checkbox = page.locator('#flag-animatedBackground');
    
    await checkbox.check();
    
    const hasAnimatedBg = await page.evaluate(() => 
      document.body.classList.contains('animated-background')
    );
    
    expect(hasAnimatedBg).toBe(true);
  });

  test('should have animation on background', async ({ page }) => {
    await page.locator('#flag-animatedBackground').check();
    
    const animation = await page.evaluate(() => 
      window.getComputedStyle(document.body).animation
    );
    
    expect(animation).toContain('gradientShift');
  });
});

test.describe('Greeting Counter Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show counter when checkbox is checked', async ({ page }) => {
    const checkbox = page.locator('#flag-showGreetingCounter');
    
    await checkbox.check();
    
    const counter = page.locator('#greetingCounter');
    await expect(counter).toBeVisible();
  });

  test('should hide counter when checkbox is unchecked', async ({ page }) => {
    const checkbox = page.locator('#flag-showGreetingCounter');
    
    await checkbox.check();
    await checkbox.uncheck();
    
    const counter = page.locator('#greetingCounter');
    await expect(counter).not.toBeVisible();
  });

  test('should display site visits', async ({ page }) => {
    await page.locator('#flag-showGreetingCounter').check();
    
    const counter = page.locator('#greetingCounter');
    const text = await counter.textContent();
    
    expect(text).toContain('Site Visits');
  });

  test('should display greetings shown', async ({ page }) => {
    await page.locator('#flag-showGreetingCounter').check();
    
    const counter = page.locator('#greetingCounter');
    const text = await counter.textContent();
    
    expect(text).toContain('Greetings Shown');
  });

  test('should increment greeting count on button click', async ({ page }) => {
    await page.locator('#flag-showGreetingCounter').check();
    
    const button = page.locator('#greetBtn');
    const counter = page.locator('#greetingCounter');
    
    // Get initial count
    const initialText = await counter.textContent();
    
    // Click button
    await button.click();
    
    // Get new count
    const newText = await counter.textContent();
    
    // Should have changed
    expect(newText).not.toBe(initialText);
  });

  test('should persist greeting count across page reloads', async ({ page }) => {
    await page.locator('#flag-showGreetingCounter').check();
    
    // Click button 3 times
    const button = page.locator('#greetBtn');
    await button.click();
    await button.click();
    await button.click();
    
    // Reload page
    await page.reload();
    
    // Re-enable counter
    await page.locator('#flag-showGreetingCounter').check();
    
    const counter = page.locator('#greetingCounter');
    const text = await counter.textContent();
    
    // Should show at least 3 greetings
    expect(text).toContain('3');
  });

  test('should show last visit time', async ({ page }) => {
    await page.locator('#flag-showGreetingCounter').check();
    
    const counter = page.locator('#greetingCounter');
    const text = await counter.textContent();
    
    expect(text).toMatch(/Last visit|First visit|Just now|ago/);
  });
});

test.describe('Reset Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should reset all flags when Reset All is clicked', async ({ page }) => {
    // Enable some flags
    await page.locator('#flag-darkMode').check();
    await page.locator('#flag-animatedBackground').check();
    
    // Click reset
    page.on('dialog', dialog => dialog.accept());
    await page.locator('text=Reset All').click();
    
    // All checkboxes should be unchecked
    await expect(page.locator('#flag-darkMode')).not.toBeChecked();
    await expect(page.locator('#flag-animatedBackground')).not.toBeChecked();
  });

  test('should reset counters when Reset Counters is clicked', async ({ page }) => {
    // Enable counter and click button
    await page.locator('#flag-showGreetingCounter').check();
    await page.locator('#greetBtn').click();
    await page.locator('#greetBtn').click();
    
    // Reset counters
    page.on('dialog', dialog => dialog.accept());
    await page.locator('text=Reset Counters').click();
    
    // Counter should show 0
    const counter = page.locator('#greetingCounter');
    const text = await counter.textContent();
    
    expect(text).toContain('0');
  });
});

test.describe('Confetti and Sound Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should trigger confetti when checkbox is checked', async ({ page }) => {
    await page.locator('#flag-confettiEffect').check();
    
    // Wait for confetti to appear
    await page.waitForTimeout(500);
    
    // Check for confetti elements
    const confettiCount = await page.locator('.confetti').count();
    expect(confettiCount).toBeGreaterThan(0);
  });

  test('confetti checkboxes should be toggleable', async ({ page }) => {
    const checkbox = page.locator('#flag-confettiEffect');
    
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });
});
