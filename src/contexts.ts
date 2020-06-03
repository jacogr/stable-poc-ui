// SPDX-License-Identifier: MIT

import { AccountCtx } from './types';

import React from 'react';
import { ApiPromise } from '@polkadot/api';

const AccountContext = React.createContext<AccountCtx>({} as AccountCtx);
const ApiContext = React.createContext<ApiPromise>({} as ApiPromise);

export {
  AccountContext,
  ApiContext
};
