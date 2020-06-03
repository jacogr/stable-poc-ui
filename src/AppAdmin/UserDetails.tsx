// SPDX-License-Identifier: MIT

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Button, ButtonRow, Section, Title } from '../components';
import { useAdmin } from '../hooks';
import Balance from '../partials/Balance';
import Transactions from '../partials/Transactions';

interface Props {
  className?: string;
}

function UserDetails ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { deriveAddress } = useAdmin();
  const [address] = useState(deriveAddress(username));
  const [isFrozen] = useState(false);

  const _doClawback = useCallback(
    (): void => {
      window.location.hash = `/clawback/${username}/${address}`;
    },
    [address, username]
  );

  const _doFreeze = useCallback(
    (): void => {
      window.location.hash = `/freeze/${username}/${address}`;
    },
    [address, username]
  );

  const _doUnfreeze = useCallback(
    (): void => {
      window.location.hash = `/unfreeze/${username}/${address}`;
    },
    [address, username]
  );

  const _doMint = useCallback(
    (): void => {
      window.location.hash = `/mint/${username}/${address}`;
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
          label='Clawback'
          onClick={_doClawback}
        />
        {isFrozen
          ? (
            <Button
              label='Unfreeze'
              onClick={_doUnfreeze}
            />
          )
          : (
            <Button
              label='Freeze'
              onClick={_doFreeze}
            />
          )
        }
      </ButtonRow>
      <Section>
        <Title>Username</Title>
        <div>{username}</div>
      </Section>
      <Section>
        <Title>Address</Title>
        <div>{address}</div>
      </Section>
      <Balance address={address} />
      <Transactions address={address} />
    </div>
  );
}

export default React.memo(styled(UserDetails)``);
