// SPDX-License-Identifier: Apache-2

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Button, ButtonRow, Section, Title } from '../components';
import { useAdmin, useIsFrozen, useIsSsc } from '../hooks';
import Balance from '../partials/Balance';
import Transactions from '../partials/Transactions';

interface Props {
  className?: string;
}

function User ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { deriveAddress } = useAdmin();
  const isSsc = useIsSsc();
  const [address] = useState(deriveAddress(username));
  const isFrozen = useIsFrozen(address);

  const _doClawback = useCallback(
    (): void => {
      window.location.hash = `/user/clawback/${username}/${address}`;
    },
    [address, username]
  );

  const _doFreeze = useCallback(
    (): void => {
      window.location.hash = `/user/freeze/${username}/${address}`;
    },
    [address, username]
  );

  const _doUnfreeze = useCallback(
    (): void => {
      window.location.hash = `/user/unfreeze/${username}/${address}`;
    },
    [address, username]
  );

  const _doMint = useCallback(
    (): void => {
      window.location.hash = `/user/mint/${username}/${address}`;
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
              isDisabled={!isSsc}
              label='Unfreeze'
              onClick={_doUnfreeze}
            />
          )
          : (
            <Button
              isDisabled={!isSsc}
              label='Freeze'
              onClick={_doFreeze}
            />
          )
        }
      </ButtonRow>
      <Balance address={address} />
      <Section>
        <Title>Username</Title>
        <div>{username}</div>
      </Section>
      <Section>
        <Title>Address</Title>
        <div>{address}</div>
      </Section>
      <Transactions address={address} />
    </div>
  );
}

export default React.memo(styled(User)``);
