// SPDX-License-Identifier: MIT

import { KeyringPair } from '@polkadot/keyring/types';
import { AccountCtx, DeriveCtx } from '../types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Keyring from '@polkadot/keyring';
import { DEV_PHRASE } from '@polkadot/keyring/defaults';

import { Button, ButtonRow, Card, InputEmail, InputPassword } from '../components';
import { AccountContext } from '../contexts';

interface Props {
  children: React.ReactNode;
  className?: string;
}

interface RootState extends DeriveCtx {
  rootPair: KeyringPair;
}

const keyring = new Keyring({ type: 'sr25519' });

function createRootState (): RootState {
  const rootPair = keyring.addFromUri(DEV_PHRASE);
  const deriveAddress = (username: string) =>
    rootPair.derive(`//${username}`).address;

  return { deriveAddress, rootPair };
}

function Auth ({ children, className }: Props): React.ReactElement<Props> {
  // This is a very bad idea in production, however as a POC it allows us to generate
  // consistent accounts from a single seed (and allows deterministic addresses)
  const [{ deriveAddress, rootPair }] = useState<RootState>(createRootState);
  const [accountCtx, setAccountCtx] = useState<AccountCtx | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('test');

  const _doLogin = useCallback(
    (): void => {
      const pair = rootPair.derive(`//${username}`);

      console.log(`Logging in with ${pair.address}`);
      setAccountCtx({ deriveAddress, pair, username });

      window.location.hash = '/account';
    },
    [deriveAddress, password, rootPair, username]
  );

  if (accountCtx) {
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
      <InputEmail
        autoFocus
        onChange={setUsername}
        placeholder='email address, eg. me@example.com'
      />
      <InputPassword
        isDisabled
        onChange={setPassword}
        placeholder='account password'
        type='password'
      />
      <ButtonRow>
        <Button
          isDisabled={!username || !password}
          label='Login'
          onClick={_doLogin}
        />
      </ButtonRow>
    </Card>
  );
}

export default React.memo(styled(Auth)``);
