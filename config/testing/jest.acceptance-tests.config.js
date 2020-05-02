const mainConfig = {
  ...require('./jest.config'),
  reporters: ['<rootDir>/config/testing/acceptance-test-reporter'],
};
const common = require('lodash').omit(mainConfig, 'projects');

module.exports = {
  ...common,
  projects: [
    {
      ...common,
      displayName: 'Acceptance Tests',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/src/__tests__/acceptance-tests/run-acceptance-tests.ts',
      ],
    },
  ],
};