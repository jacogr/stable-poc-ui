// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useIsUser (address: string): boolean {
  const api = useApi();
  const [isUser, setIsUser] = useState(false);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    setIsUser(false);

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
    }

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [address]);

  return isUser;
}
