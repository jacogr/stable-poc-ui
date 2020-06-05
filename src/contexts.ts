// SPDX-License-Identifier: Apache-2

import { AccountCtx, AdminCtx, EvtTxCtx } from './types';

import React from 'react';
import { ApiPromise } from '@polkadot/api';

const AccountContext = React.createContext<AccountCtx>({} as AccountCtx);
const AdminContext = React.createContext<AdminCtx>({} as AdminCtx);
const ApiContext = React.createContext<ApiPromise>({} as ApiPromise);
const EvtTxContext = React.createContext<EvtTxCtx>([]);

export {
  AccountContext,
  AdminContext,
  ApiContext,
  EvtTxContext
};
