// SPDX-License-Identifier: MIT

import { TxCtx, TxEvent } from '../types';

import { useContext, useEffect, useState } from 'react';

import { TxContext } from '../contexts';

export default function useTxs (address: string): TxCtx {
  // go via context here, we only have a root for all
  const all = useContext(TxContext);
  const [txs, setTxs] = useState<TxCtx>([]);

  useEffect((): void => {
    setTxs(
      all
        .filter(({ from, to }) => from === address || to === address)
        .map((event): TxEvent => ({ ...event, wasSent: event.from === address }))
    );
  }, [address, all]);

  return txs;
}
