import { ReactTester } from 'src/common/components/test-utilities/react-tester';

export interface Then {
  toString(): string;
  runAssertion(tester: ReactTester): ReactTester;
}

export function isThen(x: unknown): x is Then {
  return ((x as Then).toString && (x as Then).runAssertion) !== undefined;
}

export class UnimplementedThen implements Then {
  private readonly spec: string;

  constructor(spec: string) {
    this.spec = spec;
  }

  toString(): string {
    return this.spec;
  }

  runAssertion(): ReactTester {
    throw new Error(
      `Then implementation '${this.spec}' has not been implemented yet. Please implement it to complete the test case`,
    );
  }
}

export class IShouldSeeAHeadingTitled implements Then {
  private readonly header: string;

  constructor(header: string) {
    this.header = header;
  }

  toString(): string {
    return `I should see a heading titled '${this.header}'`;
  }

  runAssertion(tester: ReactTester): ReactTester {
    return tester.assertHasHeadingTitled(this.header);
  }
}

export class IShouldSeeAButtonLabelled implements Then {
  private readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  toString(): string {
    return `I should see a button labelled '${this.label}'`;
  }

  runAssertion(tester: ReactTester): ReactTester {
    return tester.assertHasButtonLabelled(this.label);
  }
}

export class IShouldSeeASolvedCube implements Then {
  toString(): string {
    return 'I should see a solved cube';
  }

  runAssertion(tester: ReactTester): ReactTester {
    return tester.assertHasImgWithSrcMatching((src) =>
      /\/visualcube.php\?fmt=png&bg=t&sch=wrgyob&size=150&stage=ll&alg=$/.test(
        src,
      ),
    );
  }
}
