// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';
import { ApiPromise } from '@polkadot/api';

import useIsMountedRef from './useIsMountedRef';

const AccountData = {
  free: 'Balance',
  reserved: 'Balance',
  miscFrozen: 'Balance',
  feeFrozen: 'Balance'
};

const TemplateAccountData = {
  txCount: 'u32',
  sessionIndex: 'u32'
};

export default function useApiCreate (): ApiPromise | null {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    ApiPromise
      .create({
        types: {
          AccountData: {
            ...AccountData,
            ...TemplateAccountData
          },
          Address: 'AccountId',
          LookupSource: 'AccountId',
          TemplateAccountData,
          TxCount: 'u32'
        }
      })
      .then((api): void => {
        mountedRef.current && setApi(api);
      })
      .catch(console.error);
  }, []);

  return api;
}
