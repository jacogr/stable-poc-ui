// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { Card, Section } from '../components';
import { useBalance } from '../hooks';

interface Props {
  address: string;
  className?: string;
}

function Balance ({ address, className }: Props): React.ReactElement<Props> {
  const [balance] = useBalance(address);

  return (
    <Section className={className}>
      <Card>
        <div className='balance'>
          {balance}
        </div>
      </Card>
    </Section>
  );
}

export default React.memo(styled(Balance)`
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
