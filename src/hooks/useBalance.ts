// SPDX-License-Identifier: Apache-2

import BN from 'bn.js';
import { useEffect, useState } from 'react';
import { formatBalance } from '@polkadot/util';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

type State = [string, BN, boolean];

const ZERO = new BN(0);

export default function useBalance (address: string): State {
  const api = useApi();
  const [state, setState] = useState<State>(['0', ZERO, true]);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.system
      .account(address, (result): void => {
        const { data: { free } } = result;

        console.error(result.toHuman());

        mountedRef.current && setState([
          formatBalance(free, { decimals: api.registry.chainDecimals, forceUnit: '-', withSi: false }),
          free,
          free.isZero()
        ]);
      })
      .then((u): void => {
        unsubscribe = u;
      })
      .catch(console.error);

    return (): void => {
      unsubscribe && unsubscribe();
    }
  }, [address, api]);

  return state;
}
