import { ReactTester } from 'src/common/components/test-utilities/react-tester';

const whenStringToActionApplier = {
  'I do nothing': (givenStateTester: ReactTester) => givenStateTester,
} as const;

export type ImplementedWhenStrings = keyof typeof whenStringToActionApplier;

export function applyActionFromWhen(
  givenStateTester: ReactTester,
  whenString: ImplementedWhenStrings,
): ReactTester {
  return whenStringToActionApplier[whenString](givenStateTester);
}
