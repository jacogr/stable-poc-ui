// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  address: string;
  className?: string;
}

const KNOWN: Record<string, string> = {
  '5CPnByRewLBGFt4tCg5HruzJLTQEFj1xRDdFfPeaA2xVPeaa': 'Treasury'
}

function trimAddress (address: string): string {
  return `${address.slice(0, 7)}…${address.slice(-7)}`;
}

function Address ({ address, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      {KNOWN[address] || trimAddress(address)}
    </div>
  );
}

export default React.memo(styled(Address)`
  white-space: nowrap;
`);
