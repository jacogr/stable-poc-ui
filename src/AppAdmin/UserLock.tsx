// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function UserFreeze ({ className }: Props): React.ReactElement<Props> {
  const { address, type, username } = useParams();
  const { adminPair } = useAdmin();
  const api = useApi();
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address
        ? null
        : type === 'on'
          ? api.tx.templateModule.lockAccount(address)
          : api.tx.templateModule.unlockAccount(address)
    );
  }, [address, api, type]);

  return (
    <Tx
      className={className}
      label={type === 'on' ? 'Lock' : 'Unlock'}
      pair={adminPair}
      title={type === 'on' ? `Lock ${username || ''}` : `Unlock ${username || ''}`}
      tx={tx}
    >
      <p>
        {type === 'on'
          ? 'Once locked, the user will be be able to send any funds.'
          : 'Once unlocked, normal operations will resume for the user.'
        }
      </p>
    </Tx>
  );
}

export default React.memo(styled(UserFreeze)``);
