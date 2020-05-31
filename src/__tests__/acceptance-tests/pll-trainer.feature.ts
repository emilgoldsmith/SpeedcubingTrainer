import { PLLTrainer } from 'src/__tests__/acceptance-tests/given-implementations';
import {
  IShouldSeeAButtonLabelled,
  IShouldSeeAHeadingTitled,
  IShouldSeeASolvedCube,
} from 'src/__tests__/acceptance-tests/then-implementations';

import { FeatureAcceptanceTests } from './feature-acceptance-tests';
import { AcceptanceTestCase } from './implemented-acceptance-test-case';

const tests = [
  new AcceptanceTestCase({
    given: new PLLTrainer(),
    when: 'I do nothing',
    then: [
      new IShouldSeeAHeadingTitled('PLL Trainer'),
      new IShouldSeeAButtonLabelled('Start'),
    ],
  }),
  new AcceptanceTestCase({
    given: new PLLTrainer({ state: 'after start' }),
    when: 'I do nothing',
    then: [
      new IShouldSeeAHeadingTitled('PLL Trainer'),
      new IShouldSeeAHeadingTitled('0.00'),
      new IShouldSeeASolvedCube(),
      new IShouldSeeAHeadingTitled('Press Space To Begin'),
    ],
  }),
];

export const pllTrainerAcceptanceTests: FeatureAcceptanceTests = new FeatureAcceptanceTests(
  'PLL Trainer',
  tests,
);
