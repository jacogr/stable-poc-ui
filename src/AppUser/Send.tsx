// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAddress, InputAmount, Tx } from '../components';
import { useApi, usePair, useUserCount } from '../hooks';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { deriveAddress, userAddress, userPair } = usePair();
  const { isTxFree } = useUserCount(userAddress);
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(() =>
      !recipient || amount.isZero()
        ? null
        : isTxFree
          ? api.tx.templateModule.freeTransfer(recipient, amount)
          : api.tx.templateModule.transfer(recipient, amount)
    );
  }, [amount, deriveAddress, isTxFree, recipient]);

  return (
    <Tx
      className={className}
      label='Send'
      pair={userPair}
      title='Send funds'
      tx={tx}
    >
      <InputAddress
        autoFocus
        deriveAddress={deriveAddress}
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
