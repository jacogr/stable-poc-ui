// SPDX-License-Identifier: MIT

import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

export interface DeriveCtx {
  deriveAddress: (username: string) => string;
}

export interface AccountCtx extends DeriveCtx {
  pair: KeyringPair;
  username: string;
}

export interface AdminCtx extends DeriveCtx {
  adminPair: KeyringPair;
}

export interface ApiCtx {
  api: ApiPromise;
}

