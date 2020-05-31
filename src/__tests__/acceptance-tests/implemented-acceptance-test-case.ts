import { Then } from 'src/__tests__/acceptance-tests/then-implementations';
import {
  applyActionFromWhen,
  ImplementedWhenStrings,
} from 'src/__tests__/acceptance-tests/when-implementations';

import { Given } from './given-implementations';

type ImplementedTestCaseArgs = {
  given: Given;
  when: ImplementedWhenStrings;
  then: Then[];
};

export class AcceptanceTestCase {
  private given: Given;
  private when: ImplementedWhenStrings;
  private then: Then[];
  constructor({ given, when, then }: ImplementedTestCaseArgs) {
    this.given = given;
    this.when = when;
    this.then = then;
  }
  defineJestTest(): void {
    describe(this.buildDescribeDescription(), () => {
      this.then.forEach((then) => this.defineSingleJestTest(then));
    });
  }

  private defineSingleJestTest(then: Then): void {
    it(then.toString(), () => {
      const givenStateTester = this.given.getTester();
      givenStateTester.assertRenders();
      const whenActionAppliedTester = applyActionFromWhen(
        givenStateTester,
        this.when,
      );
      then.runAssertion(whenActionAppliedTester);
    });
  }

  private buildDescribeDescription(): string {
    const stringBuilder = [];

    stringBuilder.push('Given ', this.given.toString(), ', ');
    stringBuilder.push('When ', this.when);

    return stringBuilder.join('');
  }
}
