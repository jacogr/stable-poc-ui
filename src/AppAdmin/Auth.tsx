// SPDX-License-Identifier: MIT

import { AdminCtx } from '../types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import { Button, ButtonRow, Input } from '../components';
import { AdminContext } from '../contexts';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const keyring = new Keyring({ type: 'sr25519' });

function createAdminCtx (username: string): AdminCtx {
  const rootPair = keyring.addFromUri(DEV_PHRASE);
  const adminPair = rootPair.derive(`//${username[0].toUpperCase()}${username.substr(1)}`);
  const deriveAddress = (username: string) =>
    rootPair.derive(`//${username}`).address;

  return { adminPair, deriveAddress };
}

function Auth ({ children, className }: Props): React.ReactElement<Props> {
  const [adminCtx, setAdminCtx] = useState<AdminCtx | null>(null);
  const [username, setUsername] = useState('');

  const _doLogin = useCallback(
    (): void => {
      setAdminCtx(createAdminCtx(username));

      window.location.hash = '/users';
    },
    [username]
  );

  if (adminCtx) {
    return (
      <div className={className}>
        <AdminContext.Provider value={adminCtx}>
          {children}
        </AdminContext.Provider>
      </div>
    );
  }

  return (
    <div className={className}>
      <Input
        autoFocus
        onChange={setUsername}
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
