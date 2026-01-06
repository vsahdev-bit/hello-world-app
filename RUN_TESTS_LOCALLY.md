# Running Tests Locally - Step by Step Guide

## Prerequisites Check

First, verify you have Node.js installed:

```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

If not installed, download from: https://nodejs.org/

---

## Step 1: Navigate to Project

```bash
cd hello-world-app
```

---

## Step 2: Install Dependencies

This will install Jest, Playwright, and all test dependencies:

```bash
npm install
```

**Expected output:**
```
added 123 packages, and audited 124 packages in 15s
```

---

## Step 3: Run Unit Tests

```bash
npm test
```

**You should see:**
```
PASS  tests/unit/featureFlags.test.js
  FeatureFlagManager
    ✓ should initialize with default flags (3 ms)
    ✓ should enable a flag (2 ms)
    ✓ should disable a flag (1 ms)
    ... (29 tests total)

PASS  tests/unit/features.test.js
  Features
    ✓ should initialize with greeting count (2 ms)
    ✓ should enable dark mode (1 ms)
    ... (25 tests total)

PASS  tests/integration/app.test.js
  Application Integration
    ✓ dark mode flag should control feature (4 ms)
    ... (15 tests total)

Test Suites: 3 passed, 3 total
Tests:       69 passed, 69 total
Snapshots:   0 total
Time:        2.456 s

Coverage:
  Statements   : 87.5% ( 105/120 )
  Branches     : 82.3% ( 42/51 )
  Functions    : 85.7% ( 18/21 )
  Lines        : 88.2% ( 97/110 )
```

---

## Step 4: View Coverage Report

After running `npm test`, open the coverage report in your browser:

```bash
# Mac
open coverage/lcov-report/index.html

# Windows
start coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html
```

---

## Step 5: Install Playwright Browsers (First Time Only)

```bash
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers (~300MB).

**Expected output:**
```
Downloading Chromium 119.0.6045.9 (playwright build v1091) - 137.2 Mb
Downloading Firefox 119.0 (playwright build v1422) - 78.9 Mb
Downloading Webkit 17.4 (playwright build v1883) - 61.8 Mb
```

---

## Step 6: Run E2E Tests

```bash
npm run test:e2e
```

**You should see:**
```
Running 41 tests using 5 workers

  ✓  1 [chromium] › homepage.spec.js:5:3 › Homepage › should load successfully (234ms)
  ✓  2 [chromium] › homepage.spec.js:9:3 › Homepage › should display main heading (89ms)
  ✓  3 [chromium] › greetings.spec.js:8:3 › Greeting Button › should display greeting (156ms)
  ✓  4 [firefox] › homepage.spec.js:5:3 › Homepage › should load successfully (312ms)
  ...

  41 passed (23.5s)

To open last HTML report run:
  npx playwright show-report
```

---

## Step 7: View E2E Test Report

```bash
npm run test:report
```

This opens an interactive HTML report showing:
- Screenshots of each step
- Videos of failed tests
- Timing information
- Browser logs

---

## Step 8: Run Tests with UI (Interactive Mode)

```bash
npm run test:e2e:ui
```

This opens Playwright's UI mode where you can:
- ✅ See tests run in real-time
- ✅ Pick specific tests to run
- ✅ Debug with time-travel
- ✅ Inspect DOM at each step

---

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run unit & integration tests with coverage |
| `npm run test:watch` | Run tests in watch mode (auto-rerun on changes) |
| `npm run test:unit` | Run only unit tests |
| `npm run test:integration` | Run only integration tests |
| `npm run test:e2e` | Run E2E tests (headless) |
| `npm run test:e2e:headed` | Run E2E with visible browser |
| `npm run test:e2e:ui` | Run E2E in interactive UI mode |
| `npm run test:all` | Run all tests (unit + integration + E2E) |
| `npm run test:report` | View Playwright HTML report |

---

## Expected Results

### ✅ Unit Tests
- **54 tests** should pass
- **Coverage >70%** for all files
- **Run time: ~2-3 seconds**

### ✅ Integration Tests
- **15 tests** should pass
- **Run time: ~1-2 seconds**

### ✅ E2E Tests
- **41 tests** should pass across 5 browsers
- **Run time: ~20-30 seconds**

---

## Troubleshooting

### Issue: "Cannot find module 'jest'"
**Solution:** Run `npm install` first

### Issue: "Playwright not installed"
**Solution:** Run `npx playwright install`

### Issue: "Port 8080 already in use"
**Solution:** 
```bash
# Find and kill process on port 8080
lsof -ti:8080 | xargs kill
```

### Issue: Tests fail locally but should pass
**Solution:**
```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
npm test
```

### Issue: "localStorage is not defined"
**Solution:** This should be mocked by Jest. Check that `tests/setup.js` exists.

---

## Watching Tests During Development

While developing, use watch mode:

```bash
npm run test:watch
```

Jest will:
- ✅ Re-run tests when files change
- ✅ Show only failed tests
- ✅ Provide interactive menu
- ✅ Run faster (only changed tests)

---

## Debugging a Specific Test

```bash
# Run one test file
npm test -- featureFlags.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="should enable"

# Run with verbose output
npm test -- --verbose

# Debug E2E test step-by-step
npx playwright test --debug
```

---

## Next Steps After Tests Pass

1. ✅ Check coverage report - aim for >80%
2. ✅ Run tests on different browsers
3. ✅ Add the GitHub Actions workflow
4. ✅ Set up automated testing on push
5. ✅ Add more tests for edge cases

---

## Performance Benchmarks

On a typical developer machine:

- **Unit tests:** 2-3 seconds ⚡
- **Integration tests:** 1-2 seconds ⚡
- **E2E tests:** 20-30 seconds 🚀
- **Total test suite:** ~30-35 seconds 🎯

---

## Questions?

- 📖 See **TESTING.md** for detailed documentation
- 📖 See **tests/README.md** for test overview
- 🔍 Check test files for examples
- 🌐 Visit https://jestjs.io/ for Jest docs
- 🌐 Visit https://playwright.dev/ for Playwright docs

---

**Happy Testing! 🎉**
