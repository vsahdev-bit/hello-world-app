/**
 * Unit Tests for FeatureFlagManager
 */

// Load the feature flags module
const fs = require('fs');
const path = require('path');
const featureFlagsCode = fs.readFileSync(
  path.join(__dirname, '../../featureFlags.js'),
  'utf8'
);

describe('FeatureFlagManager', () => {
  let FeatureFlagManager;
  let featureFlags;

  beforeEach(() => {
    // Clear console methods to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();

    // Evaluate the code to get the class
    eval(featureFlagsCode);
    FeatureFlagManager = eval('FeatureFlagManager');
    featureFlags = new FeatureFlagManager();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Constructor', () => {
    test('should initialize with default flags', () => {
      expect(featureFlags.flags).toBeDefined();
      expect(featureFlags.flags.darkMode).toBe(false);
      expect(featureFlags.flags.confettiEffect).toBe(false);
      expect(featureFlags.flags.soundEffects).toBe(false);
      expect(featureFlags.flags.animatedBackground).toBe(false);
      expect(featureFlags.flags.showGreetingCounter).toBe(false);
    });

    test('should load flags from localStorage if available', () => {
      localStorage.setItem('featureFlags', JSON.stringify({
        darkMode: true,
        confettiEffect: true
      }));

      const newFeatureFlags = new FeatureFlagManager();
      expect(newFeatureFlags.flags.darkMode).toBe(true);
      expect(newFeatureFlags.flags.confettiEffect).toBe(true);
    });

    test('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('featureFlags', 'invalid json');
      
      const newFeatureFlags = new FeatureFlagManager();
      expect(newFeatureFlags.flags).toEqual(featureFlags.defaultFlags);
    });
  });

  describe('isEnabled', () => {
    test('should return true for enabled flags', () => {
      featureFlags.flags.darkMode = true;
      expect(featureFlags.isEnabled('darkMode')).toBe(true);
    });

    test('should return false for disabled flags', () => {
      expect(featureFlags.isEnabled('darkMode')).toBe(false);
    });

    test('should return false for non-existent flags', () => {
      expect(featureFlags.isEnabled('nonExistent')).toBe(false);
    });
  });

  describe('enable', () => {
    test('should enable a flag', () => {
      const result = featureFlags.enable('darkMode');
      expect(result).toBe(true);
      expect(featureFlags.flags.darkMode).toBe(true);
    });

    test('should save to localStorage', () => {
      featureFlags.enable('darkMode');
      const saved = JSON.parse(localStorage.getItem('featureFlags'));
      expect(saved.darkMode).toBe(true);
    });

    test('should return false for non-existent flag', () => {
      const result = featureFlags.enable('nonExistent');
      expect(result).toBe(false);
    });

    test('should log success message', () => {
      featureFlags.enable('darkMode');
      expect(console.log).toHaveBeenCalledWith('✅ Feature "darkMode" enabled');
    });
  });

  describe('disable', () => {
    test('should disable a flag', () => {
      featureFlags.flags.darkMode = true;
      const result = featureFlags.disable('darkMode');
      expect(result).toBe(true);
      expect(featureFlags.flags.darkMode).toBe(false);
    });

    test('should save to localStorage', () => {
      featureFlags.enable('darkMode');
      featureFlags.disable('darkMode');
      const saved = JSON.parse(localStorage.getItem('featureFlags'));
      expect(saved.darkMode).toBe(false);
    });

    test('should return false for non-existent flag', () => {
      const result = featureFlags.disable('nonExistent');
      expect(result).toBe(false);
    });
  });

  describe('toggle', () => {
    test('should toggle flag from false to true', () => {
      const result = featureFlags.toggle('darkMode');
      expect(result).toBe(true);
      expect(featureFlags.flags.darkMode).toBe(true);
    });

    test('should toggle flag from true to false', () => {
      featureFlags.flags.darkMode = true;
      const result = featureFlags.toggle('darkMode');
      expect(result).toBe(false);
      expect(featureFlags.flags.darkMode).toBe(false);
    });

    test('should save to localStorage', () => {
      featureFlags.toggle('darkMode');
      const saved = JSON.parse(localStorage.getItem('featureFlags'));
      expect(saved.darkMode).toBe(true);
    });

    test('should return false for non-existent flag', () => {
      const result = featureFlags.toggle('nonExistent');
      expect(result).toBe(false);
    });
  });

  describe('getAllFlags', () => {
    test('should return copy of all flags', () => {
      featureFlags.enable('darkMode');
      const flags = featureFlags.getAllFlags();
      
      expect(flags.darkMode).toBe(true);
      expect(flags.confettiEffect).toBe(false);
    });

    test('should return a copy, not reference', () => {
      const flags = featureFlags.getAllFlags();
      flags.darkMode = true;
      
      expect(featureFlags.flags.darkMode).toBe(false);
    });
  });

  describe('reset', () => {
    test('should reset all flags to defaults', () => {
      featureFlags.enable('darkMode');
      featureFlags.enable('confettiEffect');
      
      featureFlags.reset();
      
      expect(featureFlags.flags.darkMode).toBe(false);
      expect(featureFlags.flags.confettiEffect).toBe(false);
    });

    test('should clear localStorage', () => {
      featureFlags.enable('darkMode');
      featureFlags.reset();
      
      const saved = JSON.parse(localStorage.getItem('featureFlags'));
      expect(saved.darkMode).toBe(false);
    });
  });

  describe('Persistence', () => {
    test('should persist flags across instances', () => {
      featureFlags.enable('darkMode');
      featureFlags.enable('confettiEffect');
      
      const newInstance = new FeatureFlagManager();
      expect(newInstance.flags.darkMode).toBe(true);
      expect(newInstance.flags.confettiEffect).toBe(true);
    });

    test('should merge with defaults on load', () => {
      localStorage.setItem('featureFlags', JSON.stringify({
        darkMode: true
      }));
      
      const newInstance = new FeatureFlagManager();
      expect(newInstance.flags.darkMode).toBe(true);
      expect(newInstance.flags.confettiEffect).toBe(false);
    });
  });
});
