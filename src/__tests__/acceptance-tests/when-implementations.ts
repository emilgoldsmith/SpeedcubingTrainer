import { ReactTester } from 'src/common/components/test-utilities/react-tester';

export interface When {
  toString(): string;
  applyToTester(tester: ReactTester): ReactTester;
}

export class UnimplementedWhen implements When {
  constructor(private readonly spec: string) {}
  toString(): string {
    return this.spec;
  }
  applyToTester(): ReactTester {
    throw new Error(
      `When implementation '${this.spec}' has not been implemented yet. Please implement it to complete the test case`,
    );
  }
}

export class IDoNothing implements When {
  toString(): string {
    return 'I do nothing';
  }
  applyToTester(tester: ReactTester): ReactTester {
    return tester;
  }
}

export class IClickButtonLabelled implements When {
  constructor(private readonly buttonLabel: string) {}
  toString(): string {
    return `I click the button labelled ${this.buttonLabel}`;
  }
  applyToTester(tester: ReactTester): ReactTester {
    return tester.clickButtonNamed(this.buttonLabel);
  }
}
