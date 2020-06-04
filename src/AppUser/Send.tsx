// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useApi, useIsUser, usePair, useUserCount } from '../hooks';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { deriveAddress, userAddress, userPair } = usePair();
  const { isTxFree } = useUserCount(userAddress);
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
        : isTxFree
          ? api.tx.templateModule.freeTransfer(recipient, amount)
          : api.tx.balances.transfer(recipient, amount)
    );
  }, [amount, deriveAddress, isRecipientActive, isTxFree, recipient]);

  return (
    <Tx
      className={className}
      label='Send'
      pair={userPair}
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
