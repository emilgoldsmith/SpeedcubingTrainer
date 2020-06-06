import { JestAcceptanceTestCase } from './implemented-acceptance-test-case';
import { FeatureAcceptanceTests } from './types';

export class JestFeatureAcceptanceTests implements FeatureAcceptanceTests {
  private featureName: string;
  private tests: JestAcceptanceTestCase[];
  constructor(featureName: string, tests: JestAcceptanceTestCase[]) {
    this.featureName = featureName;
    this.tests = tests;
  }

  setupTests(): void {
    describe(this.featureName, () => {
      this.tests.forEach((test) => test.defineTest());
    });
  }
}
