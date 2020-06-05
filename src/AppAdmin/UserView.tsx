// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Button, ButtonRow, Section, Title } from '../components';
import { useIsUserActive, useIsUserFrozen } from '../hooks';
import BalanceSection from '../partials/BalanceSection';
import Transactions from '../partials/Transactions';

interface Props {
  className?: string;
}

function UserView ({ className }: Props): React.ReactElement<Props> {
  const { address, username } = useParams();
  const isActive = useIsUserActive(address);
  const isFrozen = useIsUserFrozen(address);

  const _doActivate = useCallback(
    (): void => {
      window.location.hash = `/user/activate/${isActive ? 'off' : 'on'}/${address}${username ? `/${username}` : ''}`;
    },
    [address, isActive, username]
  );

  const _doClawback = useCallback(
    (): void => {
      window.location.hash = `/user/clawback/${address}${username ? `/${username}` : ''}`;
    },
    [address, username]
  );

  const _doLock = useCallback(
    (): void => {
      window.location.hash = `/user/lock/${isFrozen ? 'off' : 'on'}/${address}${username ? `/${username}` : ''}`;
    },
    [address, isFrozen, username]
  );

  const _doMint = useCallback(
    (): void => {
      window.location.hash = `/user/mint/${address}${username ? `/${username}` : ''}`;
    },
    [address, username]
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          label='Mint'
          onClick={_doMint}
        />
        <Button
          isDisabled={!isActive}
          label='Clawback'
          onClick={_doClawback}
        />
        <Button
          isDisabled={!isActive}
          label={isFrozen ? 'Unlock' : 'Lock'}
          onClick={_doLock}
        />
        <Button
          label={isActive ? 'Deactivate' : 'Activate'}
          onClick={_doActivate}
        />
      </ButtonRow>
      <BalanceSection address={address} />
      {username && (
        <Section>
          <Title>Username</Title>
          <div>{username}</div>
        </Section>
      )}
      <Section>
        <Title>Address</Title>
        <div>{address}</div>
      </Section>
      <Transactions
        address={address}
        reverse={`/user/reverse`}
      />
    </div>
  );
}

export default React.memo(styled(UserView)``);
