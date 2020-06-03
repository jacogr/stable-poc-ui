// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

export interface DeriveCtx {
  deriveAddress: (username: string) => string;
}

export interface AccountCtx extends DeriveCtx {
  address: string;
  pair: KeyringPair;
  username: string;
}

export interface AdminCtx extends DeriveCtx {
  adminPair: KeyringPair;
}

export interface ApiCtx {
  api: ApiPromise;
}

export interface TxEvent {
  amount: BN;
  key: string;
  from: string;
  to: string;
  wasSent: boolean;
}

export type TxCtx = TxEvent[];
