// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Card, Section } from '../components';
import { useApi } from '../hooks';

interface Props {
  address: string;
  className?: string;
}

function Balance ({ address, className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const [balance, setBalance] = useState('0.000');

  useEffect((): void => {
    api.query.system
      .account(address)
      .then(({ data: { free } }) =>
        setBalance(formatBalance(free, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false }))
      )
      .catch(console.error);
  }, [address, api]);

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
    font-size: 3.5rem;
    font-weight: 200;
    margin: 0.5rem 0;
    min-width: 20rem;
    text-align: right;
  }
`);
