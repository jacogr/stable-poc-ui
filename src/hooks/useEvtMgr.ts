// SPDX-License-Identifier: Apache-2

import { EvtMgrCtx } from '../types';

import { useContext } from 'react';

import { EvtMgrContext } from '../contexts';

export default function useEvtTxs (): EvtMgrCtx {
  return useContext(EvtMgrContext);
}
