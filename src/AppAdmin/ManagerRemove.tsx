// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Tx } from '../components';
import { useAdmin, useApi, useIsSsc } from '../hooks';

interface Props {
  className?: string;
}

function ManagerRemove ({ className }: Props): React.ReactElement<Props> {
  const { address } = useParams();
  const { adminAddress, adminPair } = useAdmin();
  const api = useApi();
  const isSsc = useIsSsc();
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !address || !isSsc
        ? null
        : api.tx.templateModule.removeManager(address)
    );
  }, [address, api, isSsc]);

  return (
    <Tx
      className={className}
      isDisabled={adminAddress === address}
      label='Remove'
      pair={adminPair}
      title='Remove manager'
      tx={tx}
    />
  );
}

export default React.memo(styled(ManagerRemove)``);
