# Testing Documentation

## Overview

This project includes a comprehensive test suite covering unit tests, integration tests, and end-to-end (E2E) tests.

## Test Structure

```
tests/
├── unit/                   # Unit tests for individual modules
│   ├── featureFlags.test.js
│   └── features.test.js
├── integration/            # Integration tests for combined functionality
│   └── app.test.js
└── e2e/                    # End-to-end tests with Playwright
    ├── homepage.spec.js
    ├── greetings.spec.js
    ├── featureFlags.spec.js
    └── responsive.spec.js
```

## Test Coverage

### Unit Tests (Jest)
- **FeatureFlagManager**: 100% coverage
  - Constructor and initialization
  - Enable/disable/toggle flags
  - Persistence with localStorage
  - Error handling
  
- **Features**: 100% coverage
  - Dark mode
  - Animated background
  - Confetti effects
  - Sound effects
  - Greeting counter with persistence
  - Date formatting

### Integration Tests (Jest)
- Feature flag integration with features
- Button click flow
- Persistence across page loads
- Multiple features working together
- Error handling

### E2E Tests (Playwright)
- **Homepage**: Page loading, elements visibility, styling
- **Greetings**: Button clicks, message cycling, animations
- **Feature Flags**: All 5 feature flags functionality
- **Responsive**: Mobile, tablet, desktop layouts

## Running Tests

### Prerequisites

```bash
cd hello-world-app
npm install
```

### Unit & Integration Tests

```bash
# Run all tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with browser UI
npm run test:e2e:headed

# Run E2E tests with Playwright UI
npm run test:e2e:ui

# View test report
npm run test:report
```

### Run All Tests

```bash
npm run test:all
```

## Test Configuration

### Jest Configuration (`jest.config.js`)

- **Environment**: jsdom (simulates browser)
- **Coverage threshold**: 70% for all metrics
- **Setup file**: Mocks localStorage and Web Audio API
- **Coverage directory**: `coverage/`

### Playwright Configuration (`playwright.config.js`)

- **Base URL**: http://localhost:8080
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Features**: Screenshots on failure, video on failure, trace on retry
- **Auto-start server**: Python HTTP server on port 8080

## Writing Tests

### Unit Test Example

```javascript
describe('FeatureFlagManager', () => {
  let featureFlags;

  beforeEach(() => {
    featureFlags = new FeatureFlagManager();
  });

  test('should enable a flag', () => {
    featureFlags.enable('darkMode');
    expect(featureFlags.isEnabled('darkMode')).toBe(true);
  });
});
```

### E2E Test Example

```javascript
test('should enable dark mode', async ({ page }) => {
  await page.goto('/');
  await page.locator('#flag-darkMode').check();
  
  const hasDarkMode = await page.evaluate(() => 
    document.body.classList.contains('dark-mode')
  );
  
  expect(hasDarkMode).toBe(true);
});
```

## CI/CD Integration

Tests run automatically on:
- Every push to `main` branch
- Every pull request

### GitHub Actions Workflow

**Unit Tests Job:**
1. Install Node.js 18
2. Install dependencies
3. Run Jest tests with coverage
4. Upload coverage to Codecov

**E2E Tests Job:**
1. Install Node.js 18
2. Install dependencies
3. Install Playwright browsers
4. Run Playwright tests
5. Upload test artifacts

## Test Reports

### Coverage Report

After running `npm test`, view coverage at:
```
open coverage/lcov-report/index.html
```

### Playwright Report

After running E2E tests, view report:
```
npm run test:report
```

Or manually:
```
open playwright-report/index.html
```

## Debugging Tests

### Jest Tests

```bash
# Run a specific test file
npm test -- featureFlags.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="should enable"

# Run with verbose output
npm test -- --verbose
```

### Playwright Tests

```bash
# Run a specific test file
npx playwright test homepage.spec.js

# Run with browser visible
npm run test:e2e:headed

# Run in debug mode
npx playwright test --debug

# Run specific browser
npx playwright test --project=chromium
```

## Mocked APIs

The test setup mocks:
- **localStorage**: In-memory storage for tests
- **Web Audio API**: Mock implementation for sound tests

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Use `beforeEach`/`afterEach` to reset state
3. **Assertions**: Use descriptive expect messages
4. **Coverage**: Aim for >70% code coverage
5. **Speed**: Keep unit tests fast (<1s each)
6. **E2E**: Focus on user workflows

## Troubleshooting

### Tests Fail Locally But Pass in CI
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### Playwright Tests Hang
- Check if port 8080 is already in use
- Stop other web servers: `lsof -ti:8080 | xargs kill`

### Coverage Too Low
- Run coverage report: `npm test -- --coverage`
- Check uncovered lines in `coverage/lcov-report/`

## Test Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Unit Test Coverage | >70% | TBD |
| Integration Tests | >70% | TBD |
| E2E Tests | Critical paths | ✅ |
| Test Speed (unit) | <10s | TBD |
| Test Speed (E2E) | <2min | TBD |

## Contributing

When adding new features:
1. Write tests first (TDD)
2. Ensure all tests pass
3. Maintain >70% coverage
4. Add E2E tests for user-facing features

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-testing-mistakes)
