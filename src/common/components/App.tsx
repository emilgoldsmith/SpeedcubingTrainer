// This file is going to import a lot of top level components for the switch and that's okay
/* eslint-disable import/max-dependencies */
import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';

import { Route, Switch } from 'src/common/components/routing';
import { Algorithm } from 'src/common/cube';

import { NotFound } from './html-status-code-pages/NotFound';
import { PLLTrainer } from './pll-trainer/PllTrainer';

const PLLs = {
  hPerm: new Algorithm({ moveString: 'M2UM2U2M2UM2' }),
};
const ActualApp: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Switch>
        <Route
          path="/"
          exact
          render={(): React.ReactElement => <PLLTrainer algs={[PLLs.hPerm]} />}
        />
        <NotFound />
      </Switch>
    </Container>
  );
};

export const App: React.FC = () => (
  <>
    <CssBaseline />
    <ActualApp />
  </>
);
