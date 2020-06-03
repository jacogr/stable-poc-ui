// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Section, Title } from '../components';
import Balance from '../partials/Balance';
import Transactions from '../partials/Transactions';

interface Props {
  address: string;
  className?: string;
  username: string;
}

function UserDetails ({ address, className, username }: Props): React.ReactElement<Props> {
  const _doFreeze = useCallback(
    (): void => {
      window.location.hash = `/freeze/${address}`;
    },
    [address]
  );

  return (
    <div className={className}>
      <Section>
        <Title>Username</Title>
        {username}
      </Section>
      <Section>
        <Title>Address</Title>
        {address}
      </Section>
      <Balance address={address} />
      <Transactions address={address} />
      <ButtonRow>
        <Button
          label='Freeze'
          onClick={_doFreeze}
        />
      </ButtonRow>
    </div>
  );
}

export default React.memo(styled(UserDetails)`
  margin-top: 1.5rem;
`);
