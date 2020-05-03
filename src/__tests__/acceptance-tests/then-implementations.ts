import { ReactTester } from 'src/common/components/test-utilities/react-tester';

const thenStringToAsserter = {
  "I should see a 'PLL Trainer' header": (tester: ReactTester) =>
    tester.assertHasHeading('PLL Trainer'),
  "I should see a button labelled 'Start'": (tester: ReactTester) =>
    tester.assertHasButtonNamed('Start'),
} as const;

export type ImplementedThenStrings = keyof typeof thenStringToAsserter;

export function applyThenAssertion(
  tester: ReactTester,
  thenString: ImplementedThenStrings,
): ReactTester {
  return thenStringToAsserter[thenString](tester);
}
