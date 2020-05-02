import React from 'react';

import { Route } from 'src/common/components/routing';

export const NotFound: React.FunctionComponent = () => {
  return (
    <Route
      render={({ staticContext }): React.ReactElement => {
        if (staticContext) staticContext.notFound = true;
        return <div>Sorry this page does not exist</div>;
      }}
    />
  );
};
