// SPDX-License-Identifier: Apache-2

import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import styled from 'styled-components';

import TxProvider from '../TxProvider';
import { ApiContext } from '../contexts';
import { useApiCreate } from '../hooks';
import Auth from './Auth';
import Lookup from './Lookup';
import ManagerAdd from './ManagerAdd';
import ManagerRemove from './ManagerRemove';
import ManagerView from './ManagerView';
import Managers from './Managers';
import Reports from './Reports';
import UserActivate from './UserActivate';
import UserAdd from './UserAdd';
import UserClawback from './UserClawback';
import UserLock from './UserLock';
import UserMint from './UserMint';
import UserReverse from './UserReverse';
import UserView from './UserView';

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
                <Route path='/user/activate/:type/:username'>
                  <UserActivate />
                </Route>
                <Route path='/user/reverse/:from/:to/:amount'>
                  <UserReverse />
                </Route>
                <Route path='/user/clawback/:username'>
                  <UserClawback />
                </Route>
                <Route path='/user/lock/:type/:username'>
                  <UserLock />
                </Route>
                <Route path='/user/mint/:username'>
                  <UserMint />
                </Route>
                <Route path='/user/new'>
                  <UserAdd />
                </Route>
                <Route path='/user/view/:username'>
                  <UserView />
                </Route>
                <Route path='/managers'>
                  <Managers />
                </Route>
                <Route path='/manager/new'>
                  <ManagerAdd />
                </Route>
                <Route path='/manager/remove/:address'>
                  <ManagerRemove />
                </Route>
                <Route path='/manager/view/:address'>
                  <ManagerView />
                </Route>
                <Route path='/reports'>
                  <Reports />
                </Route>
                <Route>
                  <Redirect to='/users' />
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
