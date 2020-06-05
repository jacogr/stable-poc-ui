// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { Card, Section } from '../components';
import Balance from './Balance';

interface Props {
  address: string;
  className?: string;
}

function BalanceSection ({ address, className }: Props): React.ReactElement<Props> {
  return (
    <Section className={className}>
      <Card>
        <Balance
          address={address}
          className='balance'
        />
      </Card>
    </Section>
  );
}

export default React.memo(styled(BalanceSection)`
  .balance {
    color: #002366;
    font-size: 3.5rem;
    font-weight: 200;
    line-height: 3.5rem;
    margin: 0.5rem 0;
    min-width: 20rem;
    text-align: right;
  }
`);
