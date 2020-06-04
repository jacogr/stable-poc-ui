// SPDX-License-Identifier: Apache-2

import { SessionIndex } from '@polkadot/types/interfaces';
import { TemplateAccountData } from '../types';

import BN from 'bn.js';
import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

const ZERO = new BN(0);

export default function useUserCount (address: string): BN {
  const api = useApi();
  const [txCount, setTxCount] = useState(ZERO);
  const  mountedRef = useIsMountedRef();

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.queryMulti<[TemplateAccountData, SessionIndex]>([
      [api.query.templateModule.count, [address]],
      // [api.query.session.currentIndex, []],
    ], ([{ sessionIndex, txCount }, currentIndex = ZERO]): void => {
      mountedRef.current && setTxCount(
        sessionIndex.eq(currentIndex)
          ? txCount
          : ZERO
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

  return txCount;
}
