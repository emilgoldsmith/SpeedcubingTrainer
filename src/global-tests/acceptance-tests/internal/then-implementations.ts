import { Algorithm, ReactTester } from './dependencies';
import { Then } from './types';

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
      isUrlForCube({ url: src, movesFromSolved: new Algorithm() }),
    );
  }
}
export class IShouldSeeASolvedLLCube implements Then {
  toString(): string {
    return 'I should see a solved cube only displaying the last layer';
  }

  runAssertion(tester: ReactTester): ReactTester {
    return tester.assertHasImgWithSrcMatching((src) =>
      isUrlForCube({
        url: src,
        movesFromSolved: new Algorithm(),
        cubeMode: 'll',
      }),
    );
  }
}

export class IShouldSeeLLCubeAfter implements Then {
  constructor(private readonly movesFromSolved: Algorithm) {}
  toString(): string {
    return `I should see an LL cube after ${this.movesFromSolved.toString()} has been applied from solved`;
  }
  runAssertion(tester: ReactTester): ReactTester {
    return tester.assertHasImgWithSrcMatching((src) =>
      isUrlForCube({
        url: src,
        movesFromSolved: this.movesFromSolved,
        cubeMode: 'll',
      }),
    );
  }
}

function isUrlForCube({
  url,
  movesFromSolved,
  cubeMode,
}: {
  url: string;
  movesFromSolved: Algorithm;
  cubeMode?: 'll';
}): boolean {
  const cubeModeString = cubeMode ? `&stage=${cubeMode}` : '';
  const expectedUrl = new URL(
    `http://WeDontUseTheHostName.org/visualcube.php?fmt=png&bg=t&sch=wrgyob&size=150${cubeModeString}&alg=${movesFromSolved.toString()}`,
  );
  const givenUrl = new URL(url);
  expectedUrl.searchParams.sort();
  givenUrl.searchParams.sort();
  const pathnameEqual = expectedUrl.pathname === givenUrl.pathname;
  const searchEqual = expectedUrl.search === givenUrl.search;
  return pathnameEqual && searchEqual;
}
