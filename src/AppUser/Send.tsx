// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useApi, useIsUser, usePair } from '../hooks';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { deriveAddress, pair } = usePair();
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const isRecipientActive = useIsUser(recipient);
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  const _setRecipient = useCallback(
    (email: string) => setRecipient(
      email
        ? deriveAddress(email)
        : ''
    ),
    [deriveAddress]
  );

  useEffect((): void => {
    setTx(() =>
      !isRecipientActive || !recipient || amount.isZero()
        ? null
        : api.tx.balances.transfer(recipient, amount)
    );
  }, [amount, deriveAddress, isRecipientActive, recipient]);

  return (
    <Tx
      className={className}
      label='Send'
      pair={pair}
      title='Send funds'
      tx={tx}
    >
      <InputEmail
        autoFocus
        error={isRecipientActive ? null : 'Not an active user'}
        onChange={_setRecipient}
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
