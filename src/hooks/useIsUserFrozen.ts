// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useIsUserFrozen (address: string): boolean {
  const api = useApi();
  const [isFrozen, setIsFrozen] = useState(false);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.balances
      .locks(address, (locks): void => {
        mountedRef.current && setIsFrozen(
          locks.reduce((isFrozen: boolean, lock) => isFrozen || lock.amount.isMax(), false)
        );
      })
      .then((u): void => {
        unsubscribe = unsubscribe;
      })
      .catch(console.error);

    return (): void => {
      unsubscribe && unsubscribe();
    };
  }, [address, api]);

  return isFrozen;
}
