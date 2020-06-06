import { Algorithm } from 'src/common/cube';
import {
  CompositeThen,
  IClickButtonLabelled,
  IDoNothing,
  IShouldSeeAButtonLabelled,
  IShouldSeeAHeadingTitled,
  IShouldSeeASolvedCube,
  IShouldSeeLLCubeAfter,
  JestAcceptanceTestCase,
  JestFeatureAcceptanceTests,
  PLLTrainer,
  UnimplementedWhen,
} from 'src/global-tests/acceptance-tests';

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

const ItShouldDisplayPLLTrainerDuringTestOf = (alg: Algorithm): CompositeThen =>
  new CompositeThen(
    `it should display the PLL trainer during a test of ${alg.toString()}`,
    [
      new IShouldSeeAHeadingTitled('PLL Trainer'),
      new IShouldSeeLLCubeAfter(alg.getInverse()),
      new IShouldSeeAHeadingTitled('Press Space To End'),
    ],
  );

const tests = [
  new JestAcceptanceTestCase({
    given: new PLLTrainer(),
    when: new IDoNothing(),
    then: [ItShouldDisplayPLLTrainer],
  }),
  new JestAcceptanceTestCase({
    given: new PLLTrainer(),
    when: new IClickButtonLabelled('Start'),
    then: [ItShouldDisplayPLLTrainerInBetweenTests],
  }),
  new JestAcceptanceTestCase({
    given: new PLLTrainer({ state: 'in between tests' }),
    when: new IDoNothing(),
    then: [ItShouldDisplayPLLTrainerInBetweenTests],
  }),
  new JestAcceptanceTestCase({
    given: new PLLTrainer({
      state: 'in between tests',
      algs: [new Algorithm({ moveString: 'U' })],
    }),
    when: new UnimplementedWhen('I press space'),
    then: [
      ItShouldDisplayPLLTrainerDuringTestOf(new Algorithm({ moveString: 'U' })),
    ],
  }),
  new JestAcceptanceTestCase({
    given: new PLLTrainer({
      state: 'during test',
      currentAlg: new Algorithm({ moveString: 'U' }),
    }),
    when: new IDoNothing(),
    then: [
      ItShouldDisplayPLLTrainerDuringTestOf(new Algorithm({ moveString: 'U' })),
    ],
  }),
  new JestAcceptanceTestCase({
    given: new PLLTrainer({
      state: 'during test',
    }),
    when: new UnimplementedWhen('I press space'),
    then: [ItShouldDisplayPLLTrainerInBetweenTests],
  }),
];

export const pllTrainerAcceptanceTests = new JestFeatureAcceptanceTests(
  'PLL Trainer',
  tests,
);
