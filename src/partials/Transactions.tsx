// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Section, Title } from '../components';
import { useApi, useTxs } from '../hooks';

interface Props {
  address: string;
  className?: string;
}

function Transactions ({ address, className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const txs = useTxs(address);

  return (
    <Section className={className}>
      <Title>Recent transactions</Title>
      {txs.length
        ? (
          <div className='transfer'>
            {txs.map(({ amount, key, wasSent }) => (
              <div key={key}>
                {wasSent ? '-' : '+'}{formatBalance(amount, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false })}
              </div>
            ))}
          </div>
        )
        : <div>no recent transactions</div>
      }
    </Section>
  );
}

export default React.memo(styled(Transactions)`
  .transfer {
    text-align: right;
  }
`);
