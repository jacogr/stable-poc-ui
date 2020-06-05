// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { useBalance } from '../hooks';

interface Props {
  address: string;
  className?: string;
}

function Balance ({ address, className }: Props): React.ReactElement<Props> {
  const [balance] = useBalance(address);

  return (
    <div className={className}>
      {balance}
    </div>
  );
}

export default React.memo(styled(Balance)``);
