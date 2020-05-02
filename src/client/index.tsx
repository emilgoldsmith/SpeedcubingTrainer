import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';

import { getReactAppWithProviders } from 'src/common/get-react-app-with-providers';

ReactDOM.hydrate(getReactApp(), document.getElementById('root'));

function getReactApp(): React.ReactElement {
  return process.env.NODE_ENV === 'production'
    ? getReactAppWithProviders(addProdProviders)
    : getReactAppWithProviders(addDevProviders);
}

function addDevProviders(AppRoot: React.ComponentType): React.ReactElement {
  const HotReloadedApp = hot(AppRoot);
  return addProdProviders(HotReloadedApp);
}

function addProdProviders(AppRoot: React.ComponentType): React.ReactElement {
  return (
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  );
}
