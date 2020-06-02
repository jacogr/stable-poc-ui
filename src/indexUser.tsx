
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import AppUser from './AppUser';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

ReactDOM.render(
  <Suspense fallback='...'>
    <HashRouter>
      <AppUser />
    </HashRouter>
  </Suspense>,
  rootElement
);
