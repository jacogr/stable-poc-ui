// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useIsUserActive (address: string): boolean {
  const api = useApi();
  const [isActive, setIsActive] = useState(true);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    if (address) {
      api.query.system
        .account(address, ({ refcount }): void => {
          mountedRef.current && setIsActive(
            !refcount.isZero()
          );
        })
        .then((u): void => {
          unsubscribe = u;
        })
        .catch(console.error);
    } else {
      setIsActive(false);
    }

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [address]);

  return isActive;
}
