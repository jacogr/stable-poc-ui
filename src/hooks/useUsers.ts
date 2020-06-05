// SPDX-License-Identifier: Apache-2

import { useEffect, useState } from 'react';

import { knownAddresses } from '../constants';
import useApi from './useApi';
import useIsMountedRef from './useIsMountedRef';
import useManagers from './useManagers';

const knownList = Object.keys(knownAddresses);

export default function useUsers (): string[] {
  const api = useApi();
  const managers = useManagers();
  const [users, setUsers] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const  mountedRef = useIsMountedRef();

  useEffect((): void => {
    api.query.system.account
      .entries()
      .then((entries): void => {
        mountedRef.current && setUsers(
          entries
            .filter(([, { refcount }]) => !refcount.isZero())
            .map(([key]) => key.args[0].toString())
            .filter((address) => !knownList.includes(address))
        )
      })
      .catch(console.error);
  }, [api, mountedRef]);

  useEffect((): void => {
    mountedRef.current && setFiltered(
      users.filter((address) => !managers.includes(address))
    );
  }, [managers, mountedRef, users]);

  return filtered;
}
