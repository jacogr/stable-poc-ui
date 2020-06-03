// SPDX-License-Identifier: MIT

import { useContext } from 'react';
import { ApiPromise } from '@polkadot/api';

import { ApiContext } from '../contexts';

export default function useApi (): ApiPromise {
  return useContext(ApiContext);
}
