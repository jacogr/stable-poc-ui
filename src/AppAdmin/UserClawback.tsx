// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { InputAmount, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function UserClawback ({ className }: Props): React.ReactElement<Props> {
  const { address, username } = useParams();
  const { adminPair, treasuryAddress } = useAdmin();
  const api = useApi();
  const [amount, setAmount] = useState(new BN(0));
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address || amount.isZero()
        ? null
        : api.tx.templateModule.dispatchRoot(
          api.tx.balances.forceTransfer(address, treasuryAddress, amount)
        )
    );
  }, [address, amount, api, treasuryAddress]);

  return (
    <Tx
      className={className}
      label='Clawback'
      pair={adminPair}
      title={`Clawback ${username || ''}`}
      tx={tx}
    >
      <InputAmount
        onChange={setAmount}
        placeholder='the amount to send to treasury, eg. 1.23'
      />
    </Tx>
  );
}

export default React.memo(styled(UserClawback)``);
