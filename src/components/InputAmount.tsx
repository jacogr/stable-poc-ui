// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useApi } from '../hooks';
import Input from './Input';

interface Props extends InputProps {
  error?: string | null;
  onChange: (value: BN) => void;
}

const ERR_NUM = 'Expected an amount > 0';
const TEN = new BN(10);

function InputAmount ({ autoFocus, className, error, isDisabled, onChange, placeholder, value }: Props): React.ReactElement<Props> {
  const api = useApi();
  const [decimals, setDecimals] = useState(new BN(12));
  const [errorVal, setError] = useState<string | null>(ERR_NUM);

  useEffect((): void => {
    setDecimals(new BN(api.registry.chainDecimals));
  }, [api]);

  const _onChange = useCallback(
    (input: string): void => {
      const isError = !input || !input.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/);

      if (!isError) {
        const san = input.indexOf('.') !== -1 ?  input : `${input}.0`;
        const div = san.replace(/\.\d*$/, '');
        const mod = san.replace(/^\d+\./, '');

        onChange(
          new BN(div)
            .mul(TEN.pow(decimals))
            .add(new BN(mod).mul(TEN.pow(decimals.subn(mod.length))))
        );
      }

      setError(isError ? ERR_NUM : null);
    },
    [decimals, onChange]
  );

  return (
    <Input
      autoFocus={autoFocus}
      className={className}
      error={errorVal || error}
      isDisabled={isDisabled}
      onChange={_onChange}
      placeholder={placeholder}
      type='text'
      value={value}
    />
  )
}

export default React.memo(styled(InputAmount)``);
