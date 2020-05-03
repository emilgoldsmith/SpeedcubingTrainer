import { FeatureAcceptanceTests } from './feature-acceptance-tests';
import { ImplementedAcceptanceTestCase } from './implemented-acceptance-test-case';

const tests = [
  new ImplementedAcceptanceTestCase({
    given: 'the PLL trainer',
    when: 'I do nothing',
    then: [
      "I should see a 'PLL Trainer' header",
      "I should see a button labelled 'Start'",
    ],
  }),
];

export const pllTrainerAcceptanceTests: FeatureAcceptanceTests = new FeatureAcceptanceTests(
  'PLL Trainer',
  tests,
);
