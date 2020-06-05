// SPDX-License-Identifier: Apache-2

import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import styled from 'styled-components';

import EvtMgrProvider from '../EvtMgrProvider';
import EvtTxProvider from '../EvtTxProvider';
import { ApiContext } from '../contexts';
import { useApiCreate } from '../hooks';
import Activity from './Activity';
import Auth from './Auth';
import ManagerAdd from './ManagerAdd';
import ManagerRemove from './ManagerRemove';
import ManagerView from './ManagerView';
import Managers from './Managers';
import Reports from './Reports';
import Treasury from './Treasury';
import TreasuryRefund from './TreasuryRefund';
import UserActivate from './UserActivate';
import UserClawback from './UserClawback';
import UserLock from './UserLock';
import UserMint from './UserMint';
import UserReverse from './UserReverse';
import UserView from './UserView';
import Users from './Users';

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
            <EvtTxProvider>
              <EvtMgrProvider>
                <Switch>
                  <Route path='/activity'>
                    <Activity />
                  </Route>
                  <Route path='/users'>
                    <Users />
                  </Route>
                  <Route path='/user/activate/:type/:address/:username?'>
                    <UserActivate />
                  </Route>
                  <Route path='/user/reverse/:from/:to/:amount'>
                    <UserReverse />
                  </Route>
                  <Route path='/user/clawback/:address/:username?'>
                    <UserClawback />
                  </Route>
                  <Route path='/user/lock/:type/:address/:username?'>
                    <UserLock />
                  </Route>
                  <Route path='/user/mint/:address/:username?'>
                    <UserMint />
                  </Route>
                  <Route path='/user/view/:address/:username?'>
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
                  <Route path='/treasury/refund'>
                    <TreasuryRefund />
                  </Route>
                  <Route path='/treasury'>
                    <Treasury />
                  </Route>
                  <Route>
                    <Redirect to='/users' />
                  </Route>
                </Switch>
              </EvtMgrProvider>
            </EvtTxProvider>
          </Auth>
        </ApiContext.Provider>
      )}
    </main>
  );
}

export default React.memo(styled(AppAdmin)``);
