// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

import { knownAddresses } from '../constants';

interface Props {
  address: string;
  className?: string;
}

function trimAddress (address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-6)}`;
}

function Address ({ address, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      {knownAddresses[address] || trimAddress(address)}
    </div>
  );
}

export default React.memo(styled(Address)`
  white-space: nowrap;
`);
