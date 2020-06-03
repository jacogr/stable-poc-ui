// SPDX-License-Identifier: Apache-2

import { AccountCtx, AdminCtx, TxCtx } from './types';

import React from 'react';
import { ApiPromise } from '@polkadot/api';

const AccountContext = React.createContext<AccountCtx>({} as AccountCtx);
const AdminContext = React.createContext<AdminCtx>({} as AdminCtx);
const ApiContext = React.createContext<ApiPromise>({} as ApiPromise);
const TxContext = React.createContext<TxCtx>([]);

export {
  AccountContext,
  AdminContext,
  ApiContext,
  TxContext
};
