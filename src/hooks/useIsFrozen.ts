import { useEffect, useState } from 'react';

import useApi from './useApi';

export default function useIsFrozen (address: string): boolean {
  const api = useApi();
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect((): () => void => {
    let unsubscribe: null | (() => void) = null;

    api.query.balances
      .locks(address, (locks) =>
        setIsFrozen(
          locks.reduce((isFrozen: boolean, lock) => isFrozen || lock.amount.isMax(), false)
        )
      )
      .then((u): void => {
        unsubscribe = unsubscribe;
      })
      .catch(console.error);

    return (): void => {
      unsubscribe && unsubscribe();
    };
  }, [address, api]);

  return isFrozen;
}
