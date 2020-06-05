// SPDX-License-Identifier: Apache-2

import React from 'react';
import Identicon from '@polkadot/react-identicon';

import { Address } from '../components';

interface Props {
  address: string;
}

export default function TxAddress ({ address }: Props): React.ReactElement<Props> {
  return (
    <>
      <td className='icon'>
        <Identicon
          size={28}
          theme='substrate'
          value={address}
        />
      </td>
      <td className='address'>
        <Address address={address} />
      </td>
    </>
  );
}
