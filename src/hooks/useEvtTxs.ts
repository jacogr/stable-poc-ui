// SPDX-License-Identifier: Apache-2

import { EvtTxCtx, TxEvent } from '../types';

import { useContext, useEffect, useState } from 'react';

import { EvtTxContext } from '../contexts';
import useIsMountedRef from './useIsMountedRef';

export default function useEvtTxs (address?: string): EvtTxCtx {
  // go via context here, we only have a root for all
  const all = useContext(EvtTxContext);
  const [txs, setTxs] = useState<EvtTxCtx>([]);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    mountedRef.current && setTxs(
      all
        .filter(({ from, to }) => !!address || (from === address || to === address))
        .map((event): TxEvent => ({ ...event, wasSent: event.from === address }))
    );
  }, [address, all]);

  return txs;
}
