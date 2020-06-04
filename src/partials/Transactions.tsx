// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Button, Section, Table, Title } from '../components';
import { useApi, useTxs } from '../hooks';

interface Props {
  address: string;
  className?: string;
  reverse?: string;
}

function reverseClick (reverse: string, from: string, to: string, amount: string): () => void {
  return (): void => {
    window.location.hash = `${reverse}/${from}/${to}/${amount}`;
  };
}

function Transactions ({ address, className, reverse }: Props): React.ReactElement<Props> {
  const api = useApi();
  const txs = useTxs(address);

  return (
    <Section className={className}>
      <Title>Recent transactions</Title>
      {txs.length
        ? (
          <Table className='transfer'>
            {txs.map(({ amount, from, key, to, wasSent }) => (
              <tr key={key}>
                <td>{wasSent ? '-' : '+'}{formatBalance(amount, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false })}</td>
                {reverse && (
                  <td>
                    <Button
                      isThin
                      label='Reverse'
                      onClick={reverseClick(reverse, from, to, amount.toHex())}
                    />
                  </td>
                )}
              </tr>
            ))}
          </Table>
        )
        : <div>no recent transactions</div>
      }
    </Section>
  );
}

export default React.memo(styled(Transactions)`
  .transfer {
    td {
      text-align: right;

      &:first-child {
        width: 100%;
      }
    }
  }
`);
