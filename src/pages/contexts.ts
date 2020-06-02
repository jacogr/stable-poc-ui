// SPDX-License-Identifier: MIT

import { AccountCtx } from '../types';

import React from 'react';

const AccountContext = React.createContext<AccountCtx>({});

export {
  AccountContext
};
