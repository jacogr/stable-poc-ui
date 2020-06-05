// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { InputAddress, InputAmount, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function TreasuryRefund ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const { adminPair, deriveAddress, treasuryAddress } = useAdmin();
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(() =>
      !recipient || amount.isZero()
        ? null
        : api.tx.templateModule.dispatchRoot(
          api.tx.balances.forceTransfer(treasuryAddress, recipient, amount)
        )
    );
  }, [amount, api, deriveAddress, recipient, treasuryAddress]);

  return (
    <Tx
      className={className}
      label='Refund'
      pair={adminPair}
      title='Treasury refund'
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
        placeholder='the amount to send to treasury, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(TreasuryRefund)``);
