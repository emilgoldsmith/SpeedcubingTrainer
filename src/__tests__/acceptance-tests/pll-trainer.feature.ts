import { PLLTrainer } from 'src/__tests__/acceptance-tests/given-implementations';
import {
  IShouldSeeAButtonLabelled,
  IShouldSeeAHeadingTitled,
  IShouldSeeASolvedCube,
} from 'src/__tests__/acceptance-tests/then-implementations';
import {
  IClickButtonLabelled,
  IDoNothing,
} from 'src/__tests__/acceptance-tests/when-implementations';

import { FeatureAcceptanceTests } from './feature-acceptance-tests';
import {
  AcceptanceTestCase,
  CompositeThen,
} from './implemented-acceptance-test-case';

const ItShouldDisplayPLLTrainer = new CompositeThen(
  "it should display the PLL trainer in it's initial state",
  [
    new IShouldSeeAHeadingTitled('PLL Trainer'),
    new IShouldSeeAButtonLabelled('Start'),
  ],
);

const ItShouldDisplayPLLTrainerInBetweenTests = new CompositeThen(
  "it should display the PLL Trainer in it's in between tests state",
  [
    new IShouldSeeAHeadingTitled('PLL Trainer'),
    new IShouldSeeAHeadingTitled('0.00'),
    new IShouldSeeASolvedCube(),
    new IShouldSeeAHeadingTitled('Press Space To Begin'),
  ],
);

const tests = [
  new AcceptanceTestCase({
    given: new PLLTrainer(),
    when: new IDoNothing(),
    then: [ItShouldDisplayPLLTrainer],
  }),
  new AcceptanceTestCase({
    given: new PLLTrainer(),
    when: new IClickButtonLabelled('Start'),
    then: [ItShouldDisplayPLLTrainerInBetweenTests],
  }),
  new AcceptanceTestCase({
    given: new PLLTrainer({ state: 'in between tests' }),
    when: new IDoNothing(),
    then: [ItShouldDisplayPLLTrainerInBetweenTests],
  }),
];

export const pllTrainerAcceptanceTests: FeatureAcceptanceTests = new FeatureAcceptanceTests(
  'PLL Trainer',
  tests,
);
