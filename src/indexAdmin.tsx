// SPDX-License-Identifier: MIT

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import AppAdmin from './AppAdmin';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

cryptoWaitReady()
  .then((): void => {
    ReactDOM.render(
      <Suspense fallback='...'>
        <HashRouter>
          <AppAdmin />
        </HashRouter>
      </Suspense>,
      rootElement
    );
  })
  .catch(console.error);
