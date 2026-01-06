/**
 * Unit Tests for Features
 */

const fs = require('fs');
const path = require('path');
const featuresCode = fs.readFileSync(
  path.join(__dirname, '../../features.js'),
  'utf8'
);

describe('Features', () => {
  let Features;
  let features;

  beforeEach(() => {
    // Mock DOM
    document.body.innerHTML = '<div class="container"></div>';
    
    // Clear console
    jest.spyOn(console, 'log').mockImplementation();
    
    // Clear intervals
    jest.useFakeTimers();
    
    // Evaluate the code
    eval(featuresCode);
    Features = eval('Features');
    features = new Features();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('Constructor', () => {
    test('should initialize with greeting count from localStorage', () => {
      localStorage.setItem('greetingCount', '5');
      const newFeatures = new Features();
      expect(newFeatures.greetingCount).toBe(5);
    });

    test('should initialize with zero if no saved count', () => {
      expect(features.greetingCount).toBe(0);
    });

    test('should track visit on initialization', () => {
      expect(features.visitCount).toBeGreaterThan(0);
      expect(localStorage.getItem('visitCount')).toBeTruthy();
    });

    test('should save last visit timestamp', () => {
      const lastVisit = localStorage.getItem('lastVisit');
      expect(lastVisit).toBeTruthy();
      expect(new Date(lastVisit)).toBeInstanceOf(Date);
    });
  });

  describe('Dark Mode', () => {
    test('enableDarkMode should add dark-mode class', () => {
      features.enableDarkMode();
      expect(document.body.classList.contains('dark-mode')).toBe(true);
    });

    test('disableDarkMode should remove dark-mode class', () => {
      document.body.classList.add('dark-mode');
      features.disableDarkMode();
      expect(document.body.classList.contains('dark-mode')).toBe(false);
    });
  });

  describe('Animated Background', () => {
    test('enableAnimatedBackground should add animated-background class', () => {
      features.enableAnimatedBackground();
      expect(document.body.classList.contains('animated-background')).toBe(true);
    });

    test('disableAnimatedBackground should remove animated-background class', () => {
      document.body.classList.add('animated-background');
      features.disableAnimatedBackground();
      expect(document.body.classList.contains('animated-background')).toBe(false);
    });
  });

  describe('Confetti Effect', () => {
    test('showConfetti should create confetti elements', () => {
      features.showConfetti();
      
      // Fast-forward timers
      jest.advanceTimersByTime(2000);
      
      const confettiElements = document.querySelectorAll('.confetti');
      expect(confettiElements.length).toBeGreaterThan(0);
    });

    test('enableContinuousConfetti should start interval', () => {
      features.enableContinuousConfetti();
      expect(features.confettiInterval).toBeTruthy();
    });

    test('disableContinuousConfetti should clear interval', () => {
      features.enableContinuousConfetti();
      const intervalId = features.confettiInterval;
      
      features.disableContinuousConfetti();
      expect(features.confettiInterval).toBe(null);
    });

    test('enableContinuousConfetti should not create duplicate intervals', () => {
      features.enableContinuousConfetti();
      const firstInterval = features.confettiInterval;
      
      features.enableContinuousConfetti();
      expect(features.confettiInterval).toBe(firstInterval);
    });
  });

  describe('Sound Effects', () => {
    test('playClickSound should create audio context', () => {
      features.playClickSound();
      expect(global.AudioContext).toHaveBeenCalled();
    });

    test('playClickSound should not throw error', () => {
      expect(() => features.playClickSound()).not.toThrow();
    });
  });

  describe('Greeting Counter', () => {
    test('showGreetingCounter should create counter element', () => {
      features.showGreetingCounter();
      const counter = document.getElementById('greetingCounter');
      expect(counter).toBeTruthy();
    });

    test('showGreetingCounter should display visit count', () => {
      features.showGreetingCounter();
      const counter = document.getElementById('greetingCounter');
      expect(counter.innerHTML).toContain('Site Visits');
    });

    test('showGreetingCounter should display greeting count', () => {
      features.greetingCount = 5;
      features.showGreetingCounter();
      const counter = document.getElementById('greetingCounter');
      expect(counter.innerHTML).toContain('5');
    });

    test('updateGreetingCounter should increment count', () => {
      const initialCount = features.greetingCount;
      features.updateGreetingCounter();
      expect(features.greetingCount).toBe(initialCount + 1);
    });

    test('updateGreetingCounter should save to localStorage', () => {
      features.updateGreetingCounter();
      const saved = localStorage.getItem('greetingCount');
      expect(parseInt(saved, 10)).toBe(features.greetingCount);
    });

    test('hideGreetingCounter should remove counter element', () => {
      features.showGreetingCounter();
      features.hideGreetingCounter();
      const counter = document.getElementById('greetingCounter');
      expect(counter).toBeFalsy();
    });
  });

  describe('Persistence', () => {
    test('loadGreetingCount should load from localStorage', () => {
      localStorage.setItem('greetingCount', '10');
      const count = features.loadGreetingCount();
      expect(count).toBe(10);
    });

    test('loadGreetingCount should return 0 if not saved', () => {
      const count = features.loadGreetingCount();
      expect(count).toBe(0);
    });

    test('saveGreetingCount should save to localStorage', () => {
      features.greetingCount = 15;
      features.saveGreetingCount();
      expect(localStorage.getItem('greetingCount')).toBe('15');
    });

    test('loadVisitCount should load from localStorage', () => {
      localStorage.setItem('visitCount', '20');
      const count = features.loadVisitCount();
      expect(count).toBe(20);
    });

    test('trackVisit should increment visit count', () => {
      const initialCount = features.visitCount;
      features.trackVisit();
      expect(features.visitCount).toBe(initialCount + 1);
    });

    test('getLastVisit should return date object', () => {
      const lastVisit = features.getLastVisit();
      expect(lastVisit).toBeInstanceOf(Date);
    });

    test('resetCounters should clear all counters', () => {
      features.greetingCount = 10;
      features.visitCount = 20;
      
      features.resetCounters();
      
      expect(features.greetingCount).toBe(0);
      expect(features.visitCount).toBe(0);
      expect(localStorage.getItem('visitCount')).toBe('0');
    });
  });

  describe('Date Formatting', () => {
    test('formatDate should return "Just now" for recent dates', () => {
      const now = new Date();
      const formatted = features.formatDate(now);
      expect(formatted).toBe('Just now');
    });

    test('formatDate should return minutes for recent dates', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const formatted = features.formatDate(fiveMinutesAgo);
      expect(formatted).toBe('5 mins ago');
    });

    test('formatDate should return hours for same day', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
      const formatted = features.formatDate(threeHoursAgo);
      expect(formatted).toBe('3 hours ago');
    });

    test('formatDate should return days for recent past', () => {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const formatted = features.formatDate(twoDaysAgo);
      expect(formatted).toBe('2 days ago');
    });

    test('formatDate should return formatted date for old dates', () => {
      const oldDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      const formatted = features.formatDate(oldDate);
      expect(formatted).toContain('/');
    });
  });
});
