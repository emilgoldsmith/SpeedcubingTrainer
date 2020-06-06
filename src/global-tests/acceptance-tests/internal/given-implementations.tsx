import * as React from 'react';

import {
  Algorithm,
  PLLTrainer as PLLTrainerComponent,
  ReactTester,
  State,
} from './dependencies';

import type { Given } from './types';

export class PLLTrainer implements Given {
  private readonly state: State['trainerState'];
  private readonly algs: Algorithm[];
  private readonly currentAlg: Algorithm;
  constructor({
    state = 'initial',
    algs = [],
    currentAlg = new Algorithm(),
  }: {
    state?: State['trainerState'];
    algs?: Algorithm[];
    currentAlg?: Algorithm;
  } = {}) {
    this.state = state;
    this.algs = algs;
    this.currentAlg = currentAlg;
  }

  toString(): string {
    const stateToStringMap: { [state in State['trainerState']]: string } = {
      initial: '',
      'in between tests': ' in between tests',
      'during test': ` during test of ${this.currentAlg.toString()}`,
    };
    return `the PLL trainer${stateToStringMap[this.state]}`;
  }

  getTester(): ReactTester {
    return new ReactTester(
      (
        <PLLTrainerComponent
          initialState={{
            trainerState: this.state,
            currentAlg: this.currentAlg,
          }}
          algs={this.algs}
        />
      ),
    );
  }
}
