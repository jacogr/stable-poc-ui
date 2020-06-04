// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { formatBalance } from '@polkadot/util';

import { Input, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function UserReverse ({ className }: Props): React.ReactElement<Props> {
  const { amount, from, to } = useParams();
  const { adminPair } = useAdmin();
  const api = useApi();
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      api.tx.templateModule.dispatchRoot(
        api.tx.balances.forceTransfer(to, from, amount)
      )
    );
  }, [amount, api, from, to]);

  return (
    <Tx
      className={className}
      label='Reverse'
      pair={adminPair}
      title='Reverse transfer'
      tx={tx}
    >
      <Input
        isDisabled
        value={from}
      />
      <Input
        isDisabled
        value={to}
      />
      <Input
        isDisabled
        value={formatBalance(amount, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false })}
      />
    </Tx>
  );
}

export default React.memo(styled(UserReverse)``);
