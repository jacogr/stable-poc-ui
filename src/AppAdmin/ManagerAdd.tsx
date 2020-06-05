// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Input, Tx } from '../components';
import { useAdmin, useApi } from '../hooks';

interface Props {
  className?: string;
}

function ManagerAdd ({ className }: Props): React.ReactElement<Props> {
  const { adminPair, deriveAdmin } = useAdmin();
  const api = useApi();
  const [username, setUsername] = useState('');
  const [tx, setTx] = useState<SubmittableExtrinsic<'promise'> | null>(null);

  useEffect((): void => {
    setTx(
      !username
        ? null
        : api.tx.templateModule.addManager(deriveAdmin(username))
    );
  }, [api, deriveAdmin, username]);

  return (
    <Tx
      className={className}
      label='Add'
      pair={adminPair}
      title='Add new Manager'
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

export default React.memo(styled(ManagerAdd)``);
