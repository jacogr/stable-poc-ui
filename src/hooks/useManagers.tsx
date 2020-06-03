// SPDX-License-Identifier: MIT

import { Codec } from '@polkadot/types/types';

import { useEffect, useState } from 'react';
import { Vec } from '@polkadot/types';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useManagers (): string[] {
  const api = useApi();
  const [managers, setManagers] = useState<string[]>([]);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    if (api.query.templateModule) {
      api.query.templateModule
        .managers<Vec<Codec>>((managers): void => {
          mountedRef.current && setManagers(
            managers.map((accountId) => accountId.toString())
          );
        })
        .then((u): void => {
          unsubscribe = u;
        })
        .catch(console.error);
    }

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, []);

  return managers;
}
