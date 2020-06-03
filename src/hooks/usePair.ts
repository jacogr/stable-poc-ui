// SPDX-License-Identifier: MIT

import { AccountCtx } from '../types';

import { useContext } from 'react';

import { AccountContext } from '../contexts';

export default function usePair (): AccountCtx {
  return useContext(AccountContext);
}
