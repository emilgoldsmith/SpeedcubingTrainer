import {
  applyThenAssertion,
  ImplementedThenStrings,
} from 'src/__tests__/acceptance-tests/then-implementations';
import { AcceptanceTestCase } from 'src/__tests__/acceptance-tests/types';
import {
  applyActionFromWhen,
  ImplementedWhenStrings,
} from 'src/__tests__/acceptance-tests/when-implementations';

import { buildTestDescription } from './build-test-description';
import {
  getInitialStateFromGiven,
  ImplementedGivenStrings,
} from './given-implementations';

type ImplementedTestCaseArgs = {
  given: ImplementedGivenStrings;
  when: ImplementedWhenStrings;
  then: ImplementedThenStrings[];
};

export class ImplementedAcceptanceTestCase implements AcceptanceTestCase {
  private given: ImplementedGivenStrings;
  private when: ImplementedWhenStrings;
  private then: ImplementedThenStrings[];
  constructor({ given, when, then }: ImplementedTestCaseArgs) {
    this.given = given;
    this.when = when;
    this.then = then;
  }
  defineJestTest(): void {
    const testDescription = buildTestDescription({
      given: this.given,
      when: this.when,
      then: this.then,
    });
    it(testDescription, () => {
      const givenStateTester = getInitialStateFromGiven(this.given);
      const whenActionAppliedTester = applyActionFromWhen(
        givenStateTester,
        this.when,
      );
      this.then.reduce(
        (tester, nextThenString) => applyThenAssertion(tester, nextThenString),
        whenActionAppliedTester,
      );
    });
  }
}
