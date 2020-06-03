// SPDX-License-Identifier: MIT

import { AccountCtx } from '../types';

import { useContext } from 'react';

import { AccountContext } from '../contexts';

export default function usePairs (): AccountCtx {
  return useContext(AccountContext);
}
