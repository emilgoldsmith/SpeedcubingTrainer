import { AcceptanceTestCase } from 'src/__tests__/acceptance-tests/types';

import { buildTestDescription } from './build-test-description';

type UnimplementedTestCaseArgs = {
  given: string;
  when: string;
  then: string[];
};
export class UnimplementedAcceptanceTestCase implements AcceptanceTestCase {
  private testDescription: string;
  constructor(args: UnimplementedTestCaseArgs) {
    this.testDescription = buildTestDescription(args);
  }

  defineJestTest(): void {
    it.todo(this.testDescription);
  }
}
