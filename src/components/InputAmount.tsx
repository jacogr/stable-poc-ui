// SPDX-License-Identifier: MIT

import { InputProps } from './types';

import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from './Input';

interface Props extends InputProps {
  onChange?: (value: BN) => void;
}

const ZERO = new BN(0);
const ONE = new BN(1);

function InputAmount ({ autoFocus, className, isDisabled, onChange, placeholder }: Props): React.ReactElement<Props> {
  const [isError, setIsError] = useState(true);

  const _onChange = useCallback(
    (value: string): void => {
      const isError = !value || !value.match(/^(\d+\.?\d{0,9}|\.\d{1,9})$/);

      setIsError(isError);

      onChange && onChange(isError ? ZERO : ONE);
    },
    [onChange]
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
