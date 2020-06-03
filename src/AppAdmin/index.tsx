// SPDX-License-Identifier: MIT

import { AdminCtx } from '../types';

import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import TxProvider from '../TxProvider';
import { AdminContext, ApiContext } from '../contexts';
import { useApiCreate } from '../hooks';
import AddUser from './AddUser';
import Clawback from './Clawback';
import Freeze from './Freeze';
import Lookup from './Lookup';
import Mint from './Mint';
import Navigation from './Navigation';
import Reports from './Reports';
import Unfreeze from './Unfreeze';
import UserDetails from './UserDetails';

interface Props {
  className?: string;
}

const keyring = new Keyring({ type: 'sr25519' });

function createAdminCtx (): AdminCtx {
  const rootPair = keyring.addFromUri(DEV_PHRASE);
  const adminPair = rootPair.derive('//Alice');
  const deriveAddress = (username: string) =>
    rootPair.derive(`//${username}`).address;

    return { adminPair, deriveAddress };
}

function AppAdmin ({ className }: Props): React.ReactElement<Props> {
  const api = useApiCreate();
  const [adminCtx] = useState<AdminCtx>(createAdminCtx);

  return (
    <main className={className}>
      <Navigation />
      {api && (
        <ApiContext.Provider value={api}>
          <AdminContext.Provider value={adminCtx}>
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
                <Route path='/new'>
                  <AddUser />
                </Route>
                <Route path='/unfreeze/:username'>
                  <Unfreeze />
                </Route>
                <Route path='/reports'>
                  <Reports />
                </Route>
                <Route path='/user/:username'>
                  <UserDetails />
                </Route>
                <Route>
                  <Lookup />
                </Route>
              </Switch>
            </TxProvider>
          </AdminContext.Provider>
        </ApiContext.Provider>
      )}
    </main>
  );
}

export default React.memo(styled(AppAdmin)`
  padding: 2.5rem 0;
`);
