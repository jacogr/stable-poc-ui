// SPDX-License-Identifier: Apache-2

import type { Balance } from '@polkadot/types/interfaces';
import type { u32 } from '@polkadot/types';
import type { Codec } from '@polkadot/types/types';

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
  deriveAdmin: (username: string) => string;
  username: string;
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

export interface AccountData extends Codec {
  free: Balance,
  reserved: Balance,
  miscFrozen: Balance,
  feeFrozen: Balance,
  // template
  txCount: u32,
  sessionIndex: u32
};

export interface TemplateAccountData extends Codec {
  txCount: u32,
  sessionIndex: u32
}
