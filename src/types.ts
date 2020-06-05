// SPDX-License-Identifier: Apache-2

import type { Balance, Index, RefCount } from '@polkadot/types/interfaces';
import type { u32 } from '@polkadot/types';
import type { Codec } from '@polkadot/types/types';

import { ApiPromise } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';

export interface DeriveCtx {
  deriveAddress: (username: string) => string;
}

export interface AccountCtx extends DeriveCtx {
  userAddress: string;
  userPair: KeyringPair;
  username: string;
}

export interface AdminCtx extends DeriveCtx {
  adminAddress: string;
  adminPair: KeyringPair;
  deriveAdmin: (username: string) => string;
  treasuryAddress: string;
  username: string;
}

export interface ApiCtx {
  api: ApiPromise;
}

export interface TxEvent {
  amount: Balance;
  key: string;
  from: string;
  to: string;
  wasSent: boolean;
  when: Date;
}

export type EvtTxCtx = TxEvent[];

export interface AccountData extends Codec {
  free: Balance,
  reserved: Balance,
  miscFrozen: Balance,
  feeFrozen: Balance,
  // template
  txCount: u32,
  sessionIndex: u32
};

export interface AccountInfo extends Codec {
  nonce: Index;
  refcount: RefCount;
  data: AccountData;
}

export interface TemplateAccountData extends Codec {
  txCount: u32,
  sessionIndex: u32
}
