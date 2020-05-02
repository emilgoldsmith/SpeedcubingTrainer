const fs = require('fs');
const _ = require('lodash');

module.exports = class AcceptanceTestReporter {
  constructor() {
    this.previouslyPassedTestsFilePath =
      process.env.PREVIOUS_PASSED_TESTS_FILE_PATH ||
      'previously-passed-tests.gitignore.json';
  }
  /**
   * These top methods are part of the Jest reporter API https://jestjs.io/docs/en/configuration#reporters-arraymodulename--modulename-options
   * All the methods prefixed with __ are custom helper methods
   */
  getLastError() {
    if (this.regressions.length > 0) {
      console.error(
        'The following tests regressed:\n' + this.regressions.join('\n'),
      );
      return new Error();
    }
  }

  onRunComplete(_contexts, allResults) {
    const previouslyPassedTests = this.__getPreviouslyPassedTests();
    const {
      passedTests,
      failedTests,
    } = this.__getImplementedTestResultsByResult(allResults);
    // Save it for processing by getLastError
    this.regressions = this.__getRegressions({
      previouslyPassedTests,
      currentFailedTests: failedTests,
    });
    const currentAndPreviouslyPassedTests = _.union(
      passedTests,
      previouslyPassedTests,
    );
    this.__persistNewPreviouslyPassedTests(currentAndPreviouslyPassedTests);
  }

  __getPreviouslyPassedTests() {
    try {
      return JSON.parse(fs.readFileSync(this.previouslyPassedTestsFilePath));
    } catch (e) {
      if (e.code === 'ENOENT') return [];
      throw e;
    }
  }

  __getImplementedTestResultsByResult(allResults) {
    const resultEntries = allResults.testResults
      .flatMap((x) => x.testResults)
      .filter((x) => x.status !== 'todo')
      .map((x) => ({ identifier: x.fullName, passed: x.status === 'passed' }));
    return {
      passedTests: resultEntries
        .filter((x) => x.passed === true)
        .map((x) => x.identifier),
      failedTests: resultEntries
        .filter((x) => x.passed === false)
        .map((x) => x.identifier),
    };
  }

  __getRegressions({ previouslyPassedTests, currentFailedTests }) {
    return _.intersection(previouslyPassedTests, currentFailedTests);
  }

  __persistNewPreviouslyPassedTests(nextPreviouslyPassedTests) {
    fs.writeFileSync(
      this.previouslyPassedTestsFilePath,
      JSON.stringify(nextPreviouslyPassedTests),
    );
  }
};
