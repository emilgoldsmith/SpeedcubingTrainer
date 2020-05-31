import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';

import { Route, Switch } from 'src/common/components/routing';

import { NotFound } from './html-status-code-pages/NotFound';
import { PLLTrainer } from './pll-trainer/PllTrainer';

const ActualApp: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Switch>
        <Route
          path="/"
          exact
          render={(): React.ReactElement => <PLLTrainer />}
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
