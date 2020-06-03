// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import { ApiPromise } from '@polkadot/api';

import { ApiContext } from './contexts';
import Account from './pages/Account';
import Auth from './pages/Auth';
import Request from './pages/Request';
import Send from './pages/Send';

interface Props {
  className?: string;
}

function App ({ className }: Props): React.ReactElement<Props> {
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect((): void => {
    ApiPromise
      .create()
      .then(setApi)
      .catch(console.error);
  }, []);

  return (
    <main className={className}>
      <Auth>
        {api && (
          <ApiContext.Provider value={api}>
            <Switch>
              <Route path='/account'>
                <Account />
              </Route>
              <Route path='/request'>
                <Request />
              </Route>
              <Route path='/send'>
                <Send />
              </Route>
            </Switch>
          </ApiContext.Provider>
        )}
      </Auth>
    </main>
  );
}

export default styled(App)``;
