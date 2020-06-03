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

  const _doFreeze = useCallback(
    (): void => {
      window.location.hash = `/freeze/${address}`;
    },
    [address]
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          label='Freeze'
          onClick={_doFreeze}
        />
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

export default React.memo(styled(UserDetails)`
  margin-top: 1.5rem;
`);
