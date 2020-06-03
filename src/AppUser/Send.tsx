// SPDX-License-Identifier: MIT

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useApi, usePair } from '../hooks';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { deriveAddress, pair } = usePair();
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(() =>
      !recipient || amount.isZero()
        ? null
        : api.tx.balances.transfer(deriveAddress(recipient), amount)
    );
  }, [amount, deriveAddress, recipient]);

  return (
    <Tx
      className={className}
      label='Send'
      pair={pair}
      tx={tx}
    >
      <InputEmail
        autoFocus
        onChange={setRecipient}
        placeholder='recipient email address, eg. bob@example.com'
      />
      <InputAmount
        onChange={setAmount}
        placeholder='the amount to send, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(Send)``);
