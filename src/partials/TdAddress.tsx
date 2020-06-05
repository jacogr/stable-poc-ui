// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import Identicon from '@polkadot/react-identicon';

import { Address } from '../components';

interface Props {
  address: string;
  className?: string;
}

function TxAddress ({ address, className = '' }: Props): React.ReactElement<Props> {
  return (
    <>
      <td className={`${className} icon`}>
        <Identicon
          size={28}
          theme='substrate'
          value={address}
        />
      </td>
      <td className={`${className} address`}>
        <Address address={address} />
      </td>
    </>
  );
}

export default React.memo(styled(TxAddress)`
  &.address {
    padding-left: 0.5rem;
  }

  &.icon {
    padding-right: 0;

    > div {
      display: inline-block;
      margin: 0;
    }
  }
`);
