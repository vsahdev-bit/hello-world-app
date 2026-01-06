/**
 * Integration Tests for the complete application
 */

const fs = require('fs');
const path = require('path');

// Load all modules
const featureFlagsCode = fs.readFileSync(path.join(__dirname, '../../featureFlags.js'), 'utf8');
const featuresCode = fs.readFileSync(path.join(__dirname, '../../features.js'), 'utf8');

describe('Application Integration', () => {
  let featureFlags;
  let features;

  beforeEach(() => {
    // Mock DOM
    document.body.innerHTML = `
      <div class="container">
        <h1 class="title">Hello World! 🌍</h1>
        <p class="subtitle">Welcome to My First App using RovoDev CLI</p>
        <button id="greetBtn" class="btn">Click Me!</button>
        <p id="message" class="message"></p>
      </div>
    `;

    // Clear console
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();

    // Load modules
    eval(featureFlagsCode);
    eval(featuresCode);
    
    featureFlags = new (eval('FeatureFlagManager'))();
    features = new (eval('Features'))();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Feature Flag Integration', () => {
    test('dark mode flag should control dark mode feature', () => {
      featureFlags.enable('darkMode');
      features.enableDarkMode();
      
      expect(featureFlags.isEnabled('darkMode')).toBe(true);
      expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    test('disabling dark mode flag should disable feature', () => {
      featureFlags.enable('darkMode');
      features.enableDarkMode();
      
      featureFlags.disable('darkMode');
      features.disableDarkMode();
      
      expect(document.body.classList.contains('dark-mode')).toBe(false);
    });

    test('greeting counter flag should control counter visibility', () => {
      featureFlags.enable('showGreetingCounter');
      features.showGreetingCounter();
      
      expect(document.getElementById('greetingCounter')).toBeTruthy();
      
      featureFlags.disable('showGreetingCounter');
      features.hideGreetingCounter();
      
      expect(document.getElementById('greetingCounter')).toBeFalsy();
    });
  });

  describe('Button Click Flow', () => {
    test('clicking button should update message', () => {
      const button = document.getElementById('greetBtn');
      const message = document.getElementById('message');
      
      button.click();
      
      // Message should be updated (we don't test exact content as it's random)
      expect(message.textContent).toBeTruthy();
    });

    test('clicking button with counter enabled should increment count', () => {
      featureFlags.enable('showGreetingCounter');
      features.showGreetingCounter();
      
      const initialCount = features.greetingCount;
      features.updateGreetingCounter();
      
      expect(features.greetingCount).toBe(initialCount + 1);
    });

    test('clicking button multiple times should cycle through greetings', () => {
      const button = document.getElementById('greetBtn');
      const message = document.getElementById('message');
      
      const messages = new Set();
      for (let i = 0; i < 10; i++) {
        button.click();
        messages.add(message.textContent);
      }
      
      // Should have multiple different messages
      expect(messages.size).toBeGreaterThan(1);
    });
  });

  describe('Persistence Integration', () => {
    test('enabling flags should persist across page loads', () => {
      featureFlags.enable('darkMode');
      featureFlags.enable('confettiEffect');
      
      // Simulate page reload
      const newFeatureFlags = new (eval('FeatureFlagManager'))();
      
      expect(newFeatureFlags.isEnabled('darkMode')).toBe(true);
      expect(newFeatureFlags.isEnabled('confettiEffect')).toBe(true);
    });

    test('greeting count should persist across page loads', () => {
      features.greetingCount = 5;
      features.saveGreetingCount();
      
      // Simulate page reload
      const newFeatures = new (eval('Features'))();
      
      expect(newFeatures.greetingCount).toBe(5);
    });

    test('visit count should increment on each page load', () => {
      const firstVisit = features.visitCount;
      
      // Simulate page reload
      const newFeatures = new (eval('Features'))();
      
      expect(newFeatures.visitCount).toBe(firstVisit + 1);
    });
  });

  describe('Multiple Features Together', () => {
    test('enabling all features should work together', () => {
      // Enable all features
      featureFlags.enable('darkMode');
      featureFlags.enable('animatedBackground');
      featureFlags.enable('showGreetingCounter');
      
      // Apply features
      features.enableDarkMode();
      features.enableAnimatedBackground();
      features.showGreetingCounter();
      
      // Verify all are active
      expect(document.body.classList.contains('dark-mode')).toBe(true);
      expect(document.body.classList.contains('animated-background')).toBe(true);
      expect(document.getElementById('greetingCounter')).toBeTruthy();
    });

    test('reset should disable all features', () => {
      // Enable multiple features
      featureFlags.enable('darkMode');
      featureFlags.enable('animatedBackground');
      features.enableDarkMode();
      features.enableAnimatedBackground();
      
      // Reset
      featureFlags.reset();
      features.disableDarkMode();
      features.disableAnimatedBackground();
      
      // Verify all are disabled
      expect(featureFlags.isEnabled('darkMode')).toBe(false);
      expect(featureFlags.isEnabled('animatedBackground')).toBe(false);
      expect(document.body.classList.contains('dark-mode')).toBe(false);
      expect(document.body.classList.contains('animated-background')).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid flag names gracefully', () => {
      expect(() => {
        featureFlags.enable('invalidFlag');
      }).not.toThrow();
      
      expect(featureFlags.isEnabled('invalidFlag')).toBe(false);
    });

    test('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('featureFlags', 'invalid{json}');
      
      expect(() => {
        new (eval('FeatureFlagManager'))();
      }).not.toThrow();
    });

    test('should handle missing DOM elements gracefully', () => {
      document.body.innerHTML = '';
      
      expect(() => {
        features.showGreetingCounter();
      }).toThrow(); // This should throw because container is missing
    });
  });
});
