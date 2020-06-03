// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Section, Title } from '../components';
import { usePairs } from '../hooks';
import Balance from '../partials/Balance';
import Transactions from '../partials/Transactions';

interface Props {
  className?: string;
}

function Account ({ className }: Props): React.ReactElement<Props> | null {
  const { pair, username } = usePairs();

  const _onRequest = useCallback(
    (): void => {
      window.location.hash = '/request';
    },
    []
  );

  const _onSend = useCallback(
    (): void => {
      window.location.hash = '/send';
    },
    []
  );

  if (!pair) {
    return null;
  }

  const address = pair.address;

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled
          label='Request'
          onClick={_onRequest}
        />
        <Button
          label='Send'
          onClick={_onSend}
        />
      </ButtonRow>
      <Balance address={address} />
      <Section>
        <Title>Username</Title>
        <div>{username}</div>
      </Section>
      <Transactions address={address} />
    </div>
  );
}

export default React.memo(styled(Account)``);
