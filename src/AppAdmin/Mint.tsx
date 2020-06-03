// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { InputAmount, Tx } from '../components';
import { useAdmin } from '../hooks';

interface Props {
  className?: string;
}

function Mint ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { deriveAddress } = useAdmin();
  const [address] = useState(deriveAddress(username));
  const [isCompleted, setIsCompleted] = useState(false);
  const [amount, setAmount] = useState(new BN(0));

  const _doMint = useCallback(
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
      isDisabled={amount.isZero()}
      label='Mint'
      onSend={_doMint}
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
