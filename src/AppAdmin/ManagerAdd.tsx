// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Input, Tx } from '../components';
import { useAdmin, useApi, useIsSsc } from '../hooks';

interface Props {
  className?: string;
}

function AddManager ({ className }: Props): React.ReactElement<Props> {
  const { adminPair, deriveAdmin } = useAdmin();
  const api = useApi();
  const isSsc = useIsSsc();
  const [username, setUsername] = useState('');
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !username || !isSsc
        ? null
        : api.tx.templateModule.addManager(deriveAdmin(username))
    );
  }, [api, deriveAdmin, isSsc, username]);

  return (
    <Tx
      className={className}
      label='Add Admin'
      pair={adminPair}
      title='Add new admin'
      tx={tx}
    >
      <Input
        autoFocus
        onChange={setUsername}
        placeholder='admin username, eg. Alice, Bob, ...'
      />
    </Tx>
  );
}

export default React.memo(styled(AddManager)``);
