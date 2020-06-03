// SPDX-License-Identifier: MIT

import { useEffect, useState } from 'react';
import { formatBalance } from '@polkadot/util';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useBalance (address: string): string {
  const api = useApi();
  const [balance, setBalance] = useState('0');
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.system
      .account(address, ({ data: { free } }): void => {
        mountedRef.current && setBalance(
          formatBalance(free, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false })
        );
      })
      .then((u): void => {
        unsubscribe = u;
      })
      .catch(console.error);

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [address, api]);

  return balance;
}
