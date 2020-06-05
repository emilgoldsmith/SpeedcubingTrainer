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
  private readonly algs: string[];
  constructor({
    state = 'initial',
    algs = [],
  }: { state?: State['trainerState']; algs?: string[] } = {}) {
    this.state = state;
    this.algs = algs;
  }

  toString(): string {
    const stateToStringMap: { [state in State['trainerState']]: string } = {
      initial: '',
      'in between tests': ' in between tests',
      'during test': ` during test with algs ${this.algs.join(', ')}`,
    };
    return `the PLL trainer${stateToStringMap[this.state]}`;
  }

  getTester(): ReactTester {
    return new ReactTester(
      (
        <PLLTrainerComponent
          initialState={{ trainerState: this.state, currentAlg: null }}
          algs={this.algs}
        />
      ),
    );
  }
}
