// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { useAdmin } from '../hooks';
import Account from '../partials/Account';

interface Props {
  className?: string;
}

function Treasury ({ className }: Props): React.ReactElement<Props> {
  const { treasuryAddress } = useAdmin();

  return (
    <Account
      address={treasuryAddress}
      className={className}
      sendAction='/treasury/refund'
      sendLabel='Refund'
      withoutFree
    />
  );
}

export default React.memo(styled(Treasury)``);
