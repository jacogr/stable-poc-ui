// SPDX-License-Identifier: Apache-2

import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import styled from 'styled-components';

import TxProvider from '../TxProvider';
import { ApiContext } from '../contexts';
import { useApiCreate } from '../hooks';
import AddUser from './AddUser';
import AddManager from './AddManager';
import Auth from './Auth';
import Clawback from './Clawback';
import Freeze from './Freeze';
import Lookup from './Lookup';
import Managers from './Managers';
import Mint from './Mint';
import Navigation from './Navigation';
import Reports from './Reports';
import Unfreeze from './Unfreeze';
import User from './User';

interface Props {
  className?: string;
}

function AppAdmin ({ className }: Props): React.ReactElement<Props> {
  const api = useApiCreate();

  return (
    <main className={className}>
      <Auth>
        {api && (
          <ApiContext.Provider value={api}>
            <Navigation />
            <TxProvider>
              <Switch>
                <Route path='/clawback/:username'>
                  <Clawback />
                </Route>
                <Route path='/freeze/:username'>
                  <Freeze />
                </Route>
                <Route path='/mint/:username'>
                  <Mint />
                </Route>
                <Route path='/managers'>
                  <Managers />
                </Route>
                <Route path='/new/user'>
                  <AddUser />
                </Route>
                <Route path='/new/manager'>
                  <AddManager />
                </Route>
                <Route path='/unfreeze/:username'>
                  <Unfreeze />
                </Route>
                <Route path='/reports'>
                  <Reports />
                </Route>
                <Route path='/user/:username'>
                  <User />
                </Route>
                <Route path='/users'>
                  <Lookup />
                </Route>
                <Route>
                  <Redirect to='/managers' />
                </Route>
              </Switch>
            </TxProvider>
          </ApiContext.Provider>
        )}
      </Auth>
    </main>
  );
}

export default React.memo(styled(AppAdmin)`
  padding: 2.5rem 0;
`);
