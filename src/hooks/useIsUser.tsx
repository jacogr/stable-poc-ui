// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useIsUser (address: string): boolean {
  const api = useApi();
  const [isUser, setIsUser] = useState(true);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    if (address) {
      api.query.system
        .account(address, ({ refcount }): void => {
          mountedRef.current && setIsUser(
            !refcount.isZero()
          );
        })
        .then((u): void => {
          unsubscribe = u;
        })
        .catch(console.error);
    } else {
      setIsUser(false);
    }

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [address]);

  return isUser;
}
