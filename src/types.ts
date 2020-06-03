// SPDX-License-Identifier: MIT

import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

export interface AccountCtx {
  deriveAddress: (username: string) => string;
  pair: KeyringPair;
  rootPair: KeyringPair;
}

export interface ApiCtx {
  api: ApiPromise;
}

