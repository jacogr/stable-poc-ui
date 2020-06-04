// SPDX-License-Identifier: Apache-2

import { AdminCtx } from '../types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import { Button, ButtonRow, Input, Navigation, Title } from '../components';
import { AdminContext } from '../contexts';
import { useIsSsc, useManagers } from '../hooks';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const NAV_ROUTES: [string, string, string[]][] = [
  ['/managers', 'Managers', ['/manager']],
  ['/users', 'Users', ['/user']]
];

const keyring = new Keyring({ type: 'sr25519' });

function makeAdminUsername (username: string): string {
  return `${username[0].toUpperCase()}${username.substr(1).toLowerCase()}`;;
}

function createAdminCtx (_username: string): AdminCtx {
  const username = makeAdminUsername(_username);
  const rootPair = keyring.addFromUri(DEV_PHRASE);
  const deriveAddress = (username: string) =>
    rootPair.derive(`//${username.toLowerCase()}`).address;
  const deriveAdmin = (username: string) =>
    rootPair.derive(`//${makeAdminUsername(username)}`).address;
  const adminPair = rootPair.derive(`//${username}`);


  return { adminPair, deriveAddress, deriveAdmin, username };
}

function Auth ({ children, className }: Props): React.ReactElement<Props> {
  const isSsc = useIsSsc();
  const managers = useManagers();
  const [adminCtx, setAdminCtx] = useState<AdminCtx | null>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const _doLogout = useCallback(
    (): void => {
      setAdminCtx(null);
      window.location.hash = '/';
    },
    []
  );

  const _doLogin = useCallback(
    (): void => {
      const ctx = createAdminCtx(username);
      const addr = ctx.adminPair.address;

      if (isSsc && !managers.includes(addr)) {
        setError('User is not a manager');
      } else {
        setAdminCtx(ctx);

        window.location.hash = '/users';
      }
    },
    [isSsc, managers, username]
  );

  const _setUsername = useCallback(
    (username: string): void => {
      setError(null);
      setUsername(username);
    },
    []
  );

  if (adminCtx) {
    return (
      <div className={className}>
        <AdminContext.Provider value={adminCtx}>
          <Navigation
            onLogout={_doLogout}
            routes={NAV_ROUTES}
            username={adminCtx.username}
          />
          {children}
        </AdminContext.Provider>
      </div>
    );
  }

  return (
    <div className={className}>
      <Title>Admin login</Title>
      <Input
        autoFocus
        error={error}
        onChange={_setUsername}
        placeholder='admin login, eg. Alice, Bob, ...'
      />
      <ButtonRow>
        <Button
          isDisabled={!username}
          label='Login'
          onClick={_doLogin}
        />
      </ButtonRow>
    </div>
  );
}

export default React.memo(styled(Auth)``);
