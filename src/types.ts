// SPDX-License-Identifier: MIT

import { KeyringPair } from '@polkadot/keyring/types';

export interface AccountCtx {
  pair?: KeyringPair | null;
  rootPair?: KeyringPair | null;
}

