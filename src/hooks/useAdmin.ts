// SPDX-License-Identifier: MIT

import { AdminCtx } from '../types';

import { useContext } from 'react';

import { AdminContext } from '../contexts';

export default function useAdmin (): AdminCtx {
  return useContext(AdminContext);
}
