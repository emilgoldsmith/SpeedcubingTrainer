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

type TestCaseArgs = {
  given: string;
  when: string;
  then: string | string[];
  notYetImplemented?: boolean;
};

export class AcceptanceTestCase {
  private given: string;
  private when: string;
  private then: string | string[];
  private notYetImplemented: boolean;

  constructor({ given, when, then, notYetImplemented }: TestCaseArgs) {
    this.given = given;
    this.when = when;
    this.then = then;
    this.notYetImplemented = notYetImplemented || false;
  }

  defineJestTest(): void {
    if (this.notYetImplemented) this.defineTodoTest();
    else this.defineImplementedTest();
  }

  private defineTodoTest(): void {
    it.todo(this.getTestDescription());
  }

  private defineImplementedTest(): void {
    it(this.getTestDescription(), () => {
      throw new Error('Not implemented');
    });
  }

  private getTestDescription(): string {
    const stringBuilder = [];

    stringBuilder.push('Given ', this.given, ', ');
    stringBuilder.push('When ', this.when, ', ');

    stringBuilder.push('Then ');
    stringBuilder.push(
      this.then instanceof Array ? this.then.join(' and ') : this.then,
    );

    return stringBuilder.join('');
  }
}
