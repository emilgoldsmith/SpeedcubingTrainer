import type { ReactTester } from './dependencies';

export interface Given {
  toString(): string;
  getTester(): ReactTester;
}

export interface When {
  toString(): string;
  applyToTester(tester: ReactTester): ReactTester;
}

export interface Then {
  toString(): string;
  runAssertion(tester: ReactTester): ReactTester;
}

export function isThen(x: unknown): x is Then {
  return ((x as Then).toString && (x as Then).runAssertion) !== undefined;
}

export interface FeatureAcceptanceTests {
  setupTests(): void;
}

export interface AcceptanceTestCase {
  defineTest(): void;
}
