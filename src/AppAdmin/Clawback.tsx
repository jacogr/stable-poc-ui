// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useAdmin } from '../hooks';

interface Props {
  className?: string;
}

function Clawback ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { deriveAddress } = useAdmin();
  const [address] = useState(deriveAddress(username));
  const [, setRecipient] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [amount, setAmount] = useState(new BN(0));

  const _setRecipient = useCallback(
    (username: string) => setRecipient(
      username
        ? deriveAddress(username)
        : ''
    ),
    [deriveAddress]
  );

  const _doClawback = useCallback(
    (): void => {
      // do actual send via api...
      setTimeout(() => setIsCompleted(true), 1500);
    },
    [address]
  );

  return (
    <Tx
      className={className}
      isCompleted={isCompleted}
      isDisabled={amount.isZero() || !address}
      label='Clawback'
      onSend={_doClawback}
    >
      <div>Clawback from {username}</div>
      <InputEmail
        autoFocus
        onChange={_setRecipient}
        placeholder='send funds to, eg. eve@example.com'
      />
      <InputAmount
        onChange={setAmount}
        placeholder='the amount to return, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(Clawback)``);
