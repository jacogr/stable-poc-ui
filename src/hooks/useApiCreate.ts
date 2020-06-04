// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';
import { ApiPromise } from '@polkadot/api';

import useIsMountedRef from './useIsMountedRef';

const BASE_TYPES = {
  TemplateAccountData: {
    txCount: 'u32',
    sessionIndex: 'u32'
  }
};
const TMPL_TYPES = {
  Address: 'AccountId',
  LookupSource: 'AccountId'
}

export default function useApiCreate (): ApiPromise | null {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    ApiPromise
      .create({ types: BASE_TYPES })
      .then((api): void => {
        // should be default, but we want to test against multiples
        if (api.runtimeVersion.specName.eq('node-template')) {
          api.registry.register(TMPL_TYPES);
        }

        mountedRef.current && setApi(api);
      })
      .catch(console.error);
  }, []);

  return api;
}
