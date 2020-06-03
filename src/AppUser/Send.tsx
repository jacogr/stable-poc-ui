// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useApi, usePairs } from '../hooks';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { deriveAddress, pair } = usePairs();
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const _doSend = useCallback(
    (): void => {
      let unsubscribe: (() => void) | null = null;

      api.tx.balances
        .transfer(deriveAddress(recipient), amount)
        .signAndSend(pair, ({ status }): void => {
          if (status.isInBlock || status.isFinalized) {
            setIsCompleted(true);
            unsubscribe && unsubscribe();
          }
        })
        .then((u): void => {
          unsubscribe = u;
        })
        .catch(() => setIsCompleted(true));
    },
    [api, amount, deriveAddress, pair, recipient]
  );

  useEffect((): void => {
    setIsDisabled(!recipient || amount.isZero());
  }, [amount, recipient]);

  return (
    <Tx
      className={className}
      isCompleted={isCompleted}
      isDisabled={isDisabled}
      label='Send'
      onSend={_doSend}
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
