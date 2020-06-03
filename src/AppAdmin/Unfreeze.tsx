// SPDX-License-Identifier: MIT

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Tx } from '../components';
import { useAdmin } from '../hooks';

interface Props {
  className?: string;
}

function Unfreeze ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { adminPair, deriveAddress } = useAdmin();
  const [address] = useState(deriveAddress(username));
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address
        ? null
        : null
    );
  }, [address]);

  return (
    <Tx
      className={className}
      label='Yes, unfreeze this user'
      pair={adminPair}
      tx={tx}
    >
      Unfreeze {username}
    </Tx>
  );
}

export default React.memo(styled(Unfreeze)``);
