// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Tx } from '../components';
import { useAdmin, useApi, useIsSsc } from '../hooks';

interface Props {
  className?: string;
}

function UserActivate ({ className }: Props): React.ReactElement<Props> {
  const { type, username } = useParams();
  const { adminPair, deriveAddress } = useAdmin();
  const api = useApi();
  const isSsc = useIsSsc();
  const [address] = useState(deriveAddress(username));
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address || !isSsc
        ? null
        : type === 'on'
          ? api.tx.templateModule.activateAccount(address)
          : api.tx.templateModule.deactivateAccount(address)
    );
  }, [address, api, isSsc]);

  return (
    <Tx
      className={className}
      label={type === 'on' ? 'Activate' : 'Deactivate'}
      pair={adminPair}
      title={type === 'on' ? `Activate ${username}` : `Deactivate ${username}`}
      tx={tx}
    />
  );
}

export default React.memo(styled(UserActivate)``);
