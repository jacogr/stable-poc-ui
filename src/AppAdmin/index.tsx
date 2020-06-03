// SPDX-License-Identifier: MIT

import { AdminCtx } from '../types';

import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import { AdminContext } from '../contexts';
import Freeze from './Freeze';
import Main from './Main';

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
  const [adminCtx] = useState<AdminCtx>(createAdminCtx);

  return (
    <main className={className}>
      <AdminContext.Provider value={adminCtx}>
        <Switch>
          <Route path='/freeze/:address'>
            <Freeze />
          </Route>
          <Route>
            <Main />
          </Route>
        </Switch>
      </AdminContext.Provider>
    </main>
  );
}

export default React.memo(styled(AppAdmin)`
  .userDetails {
    margin-top: 1rem;
  }
`);
