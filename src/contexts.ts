// SPDX-License-Identifier: MIT

import { AccountCtx, AdminCtx } from './types';

import React from 'react';
import { ApiPromise } from '@polkadot/api';

const AccountContext = React.createContext<AccountCtx>({} as AccountCtx);
const AdminContext = React.createContext<AdminCtx>({} as AdminCtx);
const ApiContext = React.createContext<ApiPromise>({} as ApiPromise);

export {
  AccountContext,
  AdminContext,
  ApiContext
};
