// SPDX-License-Identifier: MIT

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { InputAmount, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function Mint ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { adminPair, deriveAddress } = useAdmin();
  const api = useApi();
  const [address] = useState(deriveAddress(username));
  const [amount, setAmount] = useState(new BN(0));
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address || amount.isZero()
        ? null
        : api.tx.balances.transfer(address, amount)
    );
  }, [address, amount, api]);

  return (
    <Tx
      className={className}
      label='Mint'
      pair={adminPair}
      tx={tx}
    >
      <div>Mint to {username}</div>
      <InputAmount
        autoFocus
        onChange={setAmount}
        placeholder='the amount to allocate, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(Mint)``);
