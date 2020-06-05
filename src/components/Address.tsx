// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  address: string;
  className?: string;
}

const KNOWN: Record<string, string> = {
  '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY': 'Alice',
  '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty': 'Bob',
  '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y': 'Charlie',
  '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy': 'Dave',
  '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw': 'Eve',
  '5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL': 'Ferdie',
  '5CPnByRewLBGFt4tCg5HruzJLTQEFj1xRDdFfPeaA2xVPeaa': 'Treasury'
}

function trimAddress (address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-6)}`;
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
