// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Section, Table, Title } from '../components';
import { useApi, useEvtTxs } from '../hooks';
import TdAddress from '../partials/TdAddress';

interface Props {
  className?: string;
}

function Activity ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const txs = useEvtTxs();

  return (
    <div className={className}>
      <Section>
        <Title>Transfer activity</Title>
        {txs.length
          ? (
            <Table className='transactions'>
              {txs.map(({ amount, from, key, to }) => (
                <tr key={key}>
                  <TdAddress address={from} />
                  <TdAddress address={to} />
                  <td className='value'>{formatBalance(amount, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false })}</td>
                </tr>
              ))}
            </Table>
          )
          : <div>no recent transactions</div>
        }
      </Section>
    </div>
  );
}

export default React.memo(styled(Activity)`
  .transactions {
    td {
      &.address {
        padding-left: 0.375rem;
      }

      &.icon {
        padding-right: 0;

        > div {
          display: inline-block;
          margin: 0;
        }
      }

      &.value {
        text-align: right;
        width: 100%;
      }
    }
  }
`);
