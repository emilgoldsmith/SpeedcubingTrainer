import * as React from 'react';

import {
  PLLTrainer as PLLTrainerInitial,
  PLLTrainerAfterStart,
} from 'src/common/components/pll-trainer/PllTrainer';
import { ReactTester } from 'src/common/components/test-utilities/react-tester';

export interface Given {
  toString(): string;
  getTester(): ReactTester;
}

type PLLTrainerStates = 'after start' | 'initial';
export class PLLTrainer implements Given {
  private readonly state: PLLTrainerStates;
  constructor({ state }: { state: PLLTrainerStates } = { state: 'initial' }) {
    this.state = state;
  }

  toString(): string {
    const stateToStringMap: { [state in PLLTrainerStates]: string } = {
      initial: '',
      'after start': ' after pressing start',
    };
    return `the PLL trainer${stateToStringMap[this.state]}`;
  }

  getTester(): ReactTester {
    switch (this.state) {
      case 'initial':
        return new ReactTester(<PLLTrainerInitial />);
      case 'after start':
        return new ReactTester(<PLLTrainerAfterStart />);
      default:
        throw new Error(`Unexpected invalid state: ${this.state}`);
    }
  }
}
