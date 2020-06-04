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
      {api && (
        <ApiContext.Provider value={api}>
          <Auth>
            <TxProvider>
              <Switch>
                <Route path='/users'>
                  <Lookup />
                </Route>
                <Route path='/user/clawback/:username'>
                  <Clawback />
                </Route>
                <Route path='/user/freeze/:username'>
                  <Freeze />
                </Route>
                <Route path='/user/mint/:username'>
                  <Mint />
                </Route>
                <Route path='/user/new'>
                  <AddUser />
                </Route>
                <Route path='/user/unfreeze/:username'>
                  <Unfreeze />
                </Route>
                <Route path='/user/view/:username'>
                  <User />
                </Route>
                <Route path='/managers'>
                  <Managers />
                </Route>
                <Route path='/manager/new'>
                  <AddManager />
                </Route>
                <Route path='/reports'>
                  <Reports />
                </Route>
                <Route>
                  <Redirect to='/managers' />
                </Route>
              </Switch>
            </TxProvider>
            </Auth>
        </ApiContext.Provider>
      )}
    </main>
  );
}

export default React.memo(styled(AppAdmin)``);
