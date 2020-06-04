// SPDX-License-Identifier: Apache-2

import { SessionIndex } from '@polkadot/types/interfaces';
import { AccountInfo } from '../types';

import BN from 'bn.js';
import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

const ZERO = new BN(0);

interface State {
  isTxFree: boolean;
  txCount: BN;
}

export default function useUserCount (address: string): State {
  const api = useApi();
  const [state, setState] = useState<State>({ isTxFree: false, txCount: ZERO });
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.system
      .account<AccountInfo>(address, ({ data: { sessionIndex, txCount } }): void => {
        const currentIndex = ZERO;
        const count = sessionIndex.eq(currentIndex)
          ? txCount
          : ZERO;

        mountedRef.current && setState({
          isTxFree: count.lt(api.consts.templateModule.freeTransactionLimit as SessionIndex),
          txCount: count
        });
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
