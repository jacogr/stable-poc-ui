// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Section, Table, Title } from '../components';
import { useApi, useEvtMgr, useEvtTxs } from '../hooks';
import TdAddress from '../partials/TdAddress';
import TdDate from '../partials/TdDate';

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
                  <TdDate date={when} />
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
                  <TdDate date={when} />
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
      &.value {
        text-align: right;
        width: 100%;
      }
    }
  }
`);
