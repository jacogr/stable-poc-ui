// SPDX-License-Identifier: MIT

import { useEffect, useState } from 'react';
import { ApiPromise } from '@polkadot/api';

export default function useApiCreate (): ApiPromise | null {
  const [api, setApi] = useState<ApiPromise | null>(null);

  useEffect((): void => {
    ApiPromise
      .create()
      .then(setApi)
      .catch(console.error);
  }, []);

  return api;
}
