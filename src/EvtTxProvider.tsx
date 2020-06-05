// SPDX-License-Identifier: Apache-2

import { Balance } from '@polkadot/types/interfaces';
import { EvtTxCtx, TxEvent } from './types';

import React, { useEffect, useState } from 'react';

import { EvtTxContext } from './contexts';
import { useApi, useIsMountedRef } from './hooks';

interface Props {
  children: React.ReactNode;
}

let id = 0;

function useEvtTxs (): EvtTxCtx {
  const api = useApi();
  const [txs, setTxs] = useState<EvtTxCtx>([]);
  const mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.system
      .events((records): void => {
        const when = new Date();
        const transfers = records
          .filter(({ event: { method, section }, phase }) => phase.isApplyExtrinsic && section === 'balances' && method === 'Transfer')
          .map(({ event: { data: [from, to, amount] } }): TxEvent => ({
            amount: amount as Balance,
            from: from.toString(),
            key: `${++id}`,
            to: to.toString(),
            wasSent: false,
            when
          }));

        if (mountedRef.current && transfers.length) {
          setTxs((txs) => transfers.concat(...txs))
        }
      })
      .then((u): void => {
        unsubscribe = u;
      })
      .catch(console.error);

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [api]);

  return txs;
}


export default function EvtTxProvider ({ children }: Props): React.ReactElement<Props> {
  const txs = useEvtTxs();

  return (
    <EvtTxContext.Provider value={txs}>
      {children}
    </EvtTxContext.Provider>
  );
}
