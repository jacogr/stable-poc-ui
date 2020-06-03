// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useApi } from '../hooks';
import Input from './Input';

interface Props extends InputProps {
  onChange: (value: BN) => void;
}

const TEN = new BN(10);

function InputAmount ({ autoFocus, className, isDisabled, onChange, placeholder }: Props): React.ReactElement<Props> {
  const api = useApi();
  const [decimals, setDecimals] = useState(new BN(12));
  const [isError, setIsError] = useState(true);

  useEffect((): void => {
    setDecimals(new BN(api.registry.chainDecimals));
  }, [api]);

  const _onChange = useCallback(
    (input: string): void => {
      const isError = !input || !input.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/);

      if (!isError) {
        const div = input.replace(/\.\d*$/, '');
        const mod = input.replace(/^\d+\./, '');

        onChange(
          new BN(div)
            .mul(TEN.pow(decimals))
            .add(new BN(mod).mul(TEN.pow(decimals.subn(mod.length))))
        );
      }

      setIsError(isError);
    },
    [decimals, onChange]
  );

  return (
    <Input
      autoFocus={autoFocus}
      className={className}
      isDisabled={isDisabled}
      isError={isError}
      onChange={_onChange}
      placeholder={placeholder}
      type='text'
    />
  )
}

export default React.memo(styled(InputAmount)``);
