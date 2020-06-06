const mainConfig = {
  ...require('./jest.config'),
  reporters: ['default', '<rootDir>/config/testing/acceptance-test-reporter'],
};
const common = require('lodash').omit(mainConfig, 'projects');

module.exports = {
  ...common,
  projects: [
    {
      ...common,
      displayName: 'Acceptance Tests',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/src/global-tests/acceptance-tests/__tests__/run-acceptance-tests.ts',
      ],
    },
  ],
};
