// SPDX-License-Identifier: Apache-2

import { EvtMgrCtx, MgrEvent } from './types';

import React, { useEffect, useState } from 'react';

import { EvtMgrContext } from './contexts';
import { useApi, useIsMountedRef } from './hooks';

interface Props {
  children: React.ReactNode;
}

let id = 0;

function useMgrEvents (): EvtMgrCtx {
  const api = useApi();
  const [events, setEvents] = useState<EvtMgrCtx>([]);
  const mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.system
      .events((records): void => {
        const when = new Date();
        const transfers = records
          .filter(({ event: { section }, phase }) => phase.isApplyExtrinsic && section === 'templateModule')
          .map(({ event: { data, method } }): MgrEvent => ({
            details: JSON.stringify(data.toHuman()),
            method,
            key: `${++id}`,
            when
          }));

        if (mountedRef.current && transfers.length) {
          setEvents((events) => transfers.concat(...events))
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

  return events;
}


export default function EvtMgrProvider ({ children }: Props): React.ReactElement<Props> {
  const events = useMgrEvents();

  return (
    <EvtMgrContext.Provider value={events}>
      {children}
    </EvtMgrContext.Provider>
  );
}
