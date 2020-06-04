// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';

export default function useIsSsc (): boolean {
  const api = useApi();
  const [isSsc, setIsSsc] = useState(false);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    mountedRef.current && setIsSsc(!!api.tx.templateModule);
  }, [api]);

  return isSsc;
}
