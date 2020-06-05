// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { usePair } from '../hooks';
import Account from '../partials/Account';

interface Props {
  className?: string;
}

function UserAccount ({ className }: Props): React.ReactElement<Props> | null {
  const { userAddress } = usePair();

  return (
    <Account
      address={userAddress}
      className={className}
      sendAction='/send'
      withInactive
    />
  );
}

export default React.memo(styled(UserAccount)``);
