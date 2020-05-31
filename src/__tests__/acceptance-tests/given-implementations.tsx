import * as React from 'react';

import {
  PLLTrainer as PLLTrainerComponent,
  State,
} from 'src/common/components/pll-trainer/PllTrainer';
import { ReactTester } from 'src/common/components/test-utilities/react-tester';

export interface Given {
  toString(): string;
  getTester(): ReactTester;
}

export class PLLTrainer implements Given {
  private readonly state: State['trainerState'];
  constructor(
    { state }: { state: State['trainerState'] } = { state: 'initial' },
  ) {
    this.state = state;
  }

  toString(): string {
    const stateToStringMap: { [state in State['trainerState']]: string } = {
      initial: '',
      'in between tests': ' in between tests',
    };
    return `the PLL trainer${stateToStringMap[this.state]}`;
  }

  getTester(): ReactTester {
    return new ReactTester(
      (
        <PLLTrainerComponent
          initialState={{ trainerState: this.state, currentAlg: null }}
        />
      ),
    );
  }
}
