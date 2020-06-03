// SPDX-License-Identifier: MIT

import { useEffect, useState } from 'react';
import { ApiPromise } from '@polkadot/api';

import useIsMountedRef from './useIsMountedRef';

export default function useApiCreate (): ApiPromise | null {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    ApiPromise
      .create()
      .then((api): void => {
        const types: Record<string, any> = {
          TemplateAccountData: {
            txCount: 'u32',
            sessionIndex: 'u32'
          }
        };

        // should be default, but we want to test against multiples
        if (api.runtimeVersion.specName.eq('node-template')) {
          types.Address = 'AccountId';
          types.LookupSource = 'AccountId';
        }

        api.registry.register(types);
        mountedRef.current && setApi(api);
      })
      .catch(console.error);
  }, []);

  return api;
}
