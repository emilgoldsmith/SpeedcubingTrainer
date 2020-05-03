import * as React from 'react';

import { PllTrainer } from 'src/common/components/pll-trainer/PllTrainer';
import { ReactTester } from 'src/common/components/test-utilities/react-tester';

const givenStringToInitialStateMap = {
  'the PLL trainer': () => new ReactTester(<PllTrainer />),
} as const;

export type ImplementedGivenStrings = keyof typeof givenStringToInitialStateMap;

export function getInitialStateFromGiven(
  givenString: ImplementedGivenStrings,
): ReactTester {
  return givenStringToInitialStateMap[givenString]().assertRenders();
}
