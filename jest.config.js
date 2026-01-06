module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '*.js',
    '!jest.config.js',
    '!playwright.config.js',
    '!coverage/**'
  ],
  testMatch: [
    '**/tests/unit/**/*.test.js',
    '**/tests/integration/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
