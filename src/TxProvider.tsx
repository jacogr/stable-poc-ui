// SPDX-License-Identifier: Apache-2

import React from 'react';

import { TxContext } from './contexts';
import { useTxsAll } from './hooks';

interface Props {
  children: React.ReactNode;
}

export default function TxProvider ({ children }: Props): React.ReactElement<Props> {
  const txs = useTxsAll();

  return (
    <TxContext.Provider value={txs}>
      {children}
    </TxContext.Provider>
  );
}
