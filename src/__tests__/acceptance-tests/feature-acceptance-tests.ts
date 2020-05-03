import { AcceptanceTestCase } from 'src/__tests__/acceptance-tests/types';

export class FeatureAcceptanceTests {
  private featureName: string;
  private tests: AcceptanceTestCase[];
  constructor(featureName: string, tests: AcceptanceTestCase[]) {
    this.featureName = featureName;
    this.tests = tests;
  }

  setupAllJestTests(): void {
    describe(this.featureName, () => {
      this.tests.forEach((test) => test.defineJestTest());
    });
  }
}
