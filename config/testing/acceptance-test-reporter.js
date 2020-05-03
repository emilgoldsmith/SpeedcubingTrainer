const fs = require('fs');
const _ = require('lodash');

module.exports = class AcceptanceTestReporter {
  constructor() {
    this.previouslyPassedTestsFilePath =
      process.env.PREVIOUS_PASSED_TESTS_FILE_PATH ||
      'previously-passed-tests.gitignore.json';
    this.acceptanceTestRegressionsFilePath =
      process.env.ACCEPTANCE_TEST_REGRESSIONS_FILE_PATH ||
      'acceptance-test-regressions.gitignore.json';
  }
  /**
   * this top method is part of the Jest reporter API https://jestjs.io/docs/en/configuration#reporters-arraymodulename--modulename-options
   * All the methods prefixed with __ are custom helper methods
   */

  onRunComplete(_, allResults) {
    this.__parseTestResults(allResults);
    this.__fetchPreviouslyPassedTests();
    this.__storeAnyRegressions();
    this.__persistUpdatedPreviouslyPassedTests();
  }

  __parseTestResults(allResults) {
    const resultEntries = allResults.testResults
      .flatMap((x) => x.testResults)
      .filter((x) => x.status !== 'todo')
      .map((x) => ({ identifier: x.fullName, passed: x.status === 'passed' }));

    this.passedTests = resultEntries
      .filter((x) => x.passed === true)
      .map((x) => x.identifier);
    this.failedTests = resultEntries
      .filter((x) => x.passed === false)
      .map((x) => x.identifier);
  }

  __fetchPreviouslyPassedTests() {
    try {
      this.previouslyPassedTests = JSON.parse(
        fs.readFileSync(this.previouslyPassedTestsFilePath),
      );
    } catch (e) {
      if (e.code === 'ENOENT') this.previouslyPassedTests = [];
      throw e;
    }
  }

  __storeAnyRegressions() {
    const regressions = _.intersection(
      this.previouslyPassedTests,
      this.failedTests,
    );
    fs.writeFileSync(
      this.acceptanceTestRegressionsFilePath,
      JSON.stringify(regressions),
    );
  }

  __persistUpdatedPreviouslyPassedTests() {
    const updatedPreviouslyPassedTests = _.union(
      this.previouslyPassedTests,
      this.passedTests,
    );
    fs.writeFileSync(
      this.previouslyPassedTestsFilePath,
      JSON.stringify(updatedPreviouslyPassedTests),
    );
  }
};
