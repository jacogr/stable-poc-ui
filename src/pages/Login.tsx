// SPDX-License-Identifier: MIT

import { AccountCtx } from '../types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import { Button, ButtonRow, Card, Input } from '../components';
import { AccountContext } from './contexts';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const keyring = new Keyring({ type: 'sr25519' });

function Login ({ children, className }: Props): React.ReactElement<Props> {
  const [accountCtx, setAccountCtx] = useState<AccountCtx>({ rootPair: keyring.addFromUri(DEV_PHRASE) });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _onLogin = useCallback(
    (): void => {
      // This is a very bad idea in production, however as a POC it allows us to generate
      // consistent accounts from a single seed (and allows deterministic addresses)
      setAccountCtx(({ rootPair }): AccountCtx => ({
        pair: rootPair?.derive(`//${username}`),
        rootPair
      }));
      window.location.hash = '/account';
    },
    [password, username]
  );

  if (accountCtx.pair && window.location.hash !== '/') {
    return (
      <div className={className}>
        <AccountContext.Provider value={accountCtx}>
          {children}
        </AccountContext.Provider>
      </div>
    );
  }

  return (
    <Card className={className}>
      <Input
        onChange={setUsername}
        placeholder='joe@example.com'
        type='text'
      />
      <Input
        onChange={setPassword}
        placeholder='password'
        type='password'
      />
      <ButtonRow>
        <Button
          isDisabled={!username || !password}
          label='Login'
          onClick={_onLogin}
        />
      </ButtonRow>
    </Card>
  );
}

export default styled(Login)``;
