import {
  isThen,
  Then,
} from 'src/__tests__/acceptance-tests/then-implementations';
import { When } from 'src/__tests__/acceptance-tests/when-implementations';

import { Given } from './given-implementations';

interface AssertionComponent {
  defineTests(given: Given, when: When): void;
}

class AssertionLeaf implements AssertionComponent {
  constructor(private then: Then) {}

  defineTests(given: Given, when: When): void {
    it(this.then.toString(), () => {
      const givenStateTester = given.getTester();
      givenStateTester.assertRenders();
      const whenActionAppliedTester = when.applyToTester(givenStateTester);
      this.then.runAssertion(whenActionAppliedTester);
    });
  }
}

type ThenInput = (Then | AssertionComponent)[];

class AssertionComposite implements AssertionComponent {
  private children: AssertionComponent[];

  constructor(private description: string, thens: ThenInput) {
    this.children = thens.map((x) => (isThen(x) ? new AssertionLeaf(x) : x));
  }

  defineTests(given: Given, when: When): void {
    describe(this.description, () => {
      this.children.forEach((x) => x.defineTests(given, when));
    });
  }
}

/**
 * Just a version of AssertionComposite that doesn't wrap the tests in a define block
 */
class AssertionRoot implements AssertionComponent {
  private children: AssertionComponent[];
  constructor(thens: ThenInput) {
    this.children = thenInputToAssertionComponents(thens);
  }

  defineTests(given: Given, when: When): void {
    this.children.forEach((x) => x.defineTests(given, when));
  }
}

/**
 * A more user friendly name for outside use
 */
export { AssertionComposite as CompositeThen };

type ImplementedTestCaseArgs = {
  given: Given;
  when: When;
  then: ThenInput;
};

export class AcceptanceTestCase {
  private given: Given;
  private when: When;
  private assertions: AssertionComponent;
  constructor({ given, when, then: thenInput }: ImplementedTestCaseArgs) {
    this.given = given;
    this.when = when;
    this.assertions = new AssertionRoot(thenInput);
  }
  defineJestTest(): void {
    describe(this.buildDescribeDescription(), () => {
      this.assertions.defineTests(this.given, this.when);
    });
  }

  private buildDescribeDescription(): string {
    const stringBuilder = [];

    stringBuilder.push('Given ', this.given.toString(), ', ');
    stringBuilder.push('When ', this.when.toString());

    return stringBuilder.join('');
  }
}
function thenInputToAssertionComponents(
  thens: ThenInput,
): AssertionComponent[] {
  return thens.map((x) => (isThen(x) ? new AssertionLeaf(x) : x));
}
