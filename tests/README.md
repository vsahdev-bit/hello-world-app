# Test Suite

## Quick Start

```bash
# Install dependencies
npm install

# Run all unit & integration tests
npm test

# Run E2E tests (install browsers first time)
npx playwright install
npm run test:e2e

# Run everything
npm run test:all
```

## Test Files

### Unit Tests (`tests/unit/`)
- `featureFlags.test.js` - FeatureFlagManager class (29 tests)
- `features.test.js` - Features class (25 tests)

### Integration Tests (`tests/integration/`)
- `app.test.js` - Full application integration (15 tests)

### E2E Tests (`tests/e2e/`)
- `homepage.spec.js` - Homepage loading and elements (8 tests)
- `greetings.spec.js` - Greeting button functionality (9 tests)
- `featureFlags.spec.js` - Feature flags UI and persistence (20 tests)
- `responsive.spec.js` - Responsive design (4 tests)

**Total: ~110 automated tests**

## Test Coverage

- Unit Tests: 100% of core modules
- Integration Tests: All major workflows
- E2E Tests: All user interactions
- Responsive Tests: Mobile, tablet, desktop

## More Info

See [TESTING.md](../TESTING.md) for detailed documentation.
