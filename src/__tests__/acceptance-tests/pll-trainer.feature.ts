import {
  AcceptanceTestCase,
  FeatureAcceptanceTests,
} from './test-case-objects';

const tests = [
  new AcceptanceTestCase({
    given: 'the PLL trainer',
    when: 'I do nothing',
    then: [
      'I should see a PLL trainer header',
      "I should see a button labelled 'Start'",
    ],
    notYetImplemented: true,
  }),
];

export const pllTrainerAcceptanceTests: FeatureAcceptanceTests = new FeatureAcceptanceTests(
  'PLL Trainer',
  tests,
);
