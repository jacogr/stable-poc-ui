// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { InputAmount, InputEmail, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function UserClawback ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { adminPair, deriveAddress } = useAdmin();
  const api = useApi();
  const [address] = useState(deriveAddress(username));
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(new BN(0));
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address || !recipient || amount.isZero()
        ? null
        : api.tx.templateModule.dispatchRoot(
          api.tx.balances.forceTransfer(address, deriveAddress(recipient), amount)
        )
    );
  }, [address, amount, api, deriveAddress, recipient]);

  return (
    <Tx
      className={className}
      label='Clawback'
      pair={adminPair}
      title={`Clawback from ${username}`}
      tx={tx}
    >
      <InputEmail
        autoFocus
        onChange={setRecipient}
        placeholder='send funds to, eg. eve@example.com'
      />
      <InputAmount
        onChange={setAmount}
        placeholder='the amount to return, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(UserClawback)``);
