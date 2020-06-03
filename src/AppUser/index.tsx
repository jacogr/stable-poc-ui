// SPDX-License-Identifier: Apache-2

import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import styled from 'styled-components';

import TxProvider from '../TxProvider';
import { ApiContext } from '../contexts';
import { useApiCreate } from '../hooks';
import Account from './Account';
import Auth from './Auth';
import Request from './Request';
import Send from './Send';

interface Props {
  className?: string;
}

function AppUser ({ className }: Props): React.ReactElement<Props> {
  const api = useApiCreate();

  return (
    <main className={className}>
      <Auth>
        {api && (
          <ApiContext.Provider value={api}>
            <TxProvider>
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
                <Route>
                  <Redirect to='/account' />
                </Route>
              </Switch>
            </TxProvider>
          </ApiContext.Provider>
        )}
      </Auth>
    </main>
  );
}

export default React.memo(styled(AppUser)``);
