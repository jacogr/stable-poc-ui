// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Section, Table, Title } from '../components';
import { useApi, useEvtMgr, useEvtTxs } from '../hooks';
import TdAddress from '../partials/TdAddress';

interface Props {
  className?: string;
}

function Activity ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const evts = useEvtMgr();
  const txs = useEvtTxs();

  return (
    <div className={className}>
      <Section>
        <Title>Manager events</Title>
        {evts.length
          ? (
            <Table className='activity'>
              {evts.map(({ key, method, when }) => (
                <tr key={key}>
                  <td className='date'>{when.toLocaleString()}</td>
                  <td>{method}</td>
                </tr>
              ))}
            </Table>
          )
          : <div>no recent manager activity</div>
        }
      </Section>
      <Section>
        <Title>Transfers</Title>
        {txs.length
          ? (
            <Table className='activity'>
              {txs.map(({ amount, from, key, to, when }) => (
                <tr key={key}>
                  <td className='date'>{when.toLocaleString()}</td>
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
  .activity {
    td {
      &.address {
        padding-left: 0.375rem;
      }

      &.date {
        font-size: 0.8rem;
        width: 1rem;
        white-space: wrap;
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
