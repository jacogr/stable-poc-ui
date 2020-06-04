// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from './Input';

interface Props extends InputProps {
  error?: string | null;
  onChange: (value: string) => void;
}

const ERR_EMAIL = 'Invalid e-mail address';

function InputEmail ({ autoFocus, className, error, isDisabled, onChange, placeholder }: Props): React.ReactElement<Props> {
  const [errorVal, setError] = useState<string | null>(ERR_EMAIL);

  const _onChange = useCallback(
    (value: string): void => {
      const indexAt = value.indexOf('@');
      const isError = !value || indexAt <= 0 || !value.substr(indexAt + 1).includes('.');

      setError(isError ? ERR_EMAIL : null);
      onChange(isError ? '' : value);
    },
    [onChange]
  );

  return (
    <Input
      autoFocus={autoFocus}
      className={className}
      isDisabled={isDisabled}
      error={errorVal || error}
      onChange={_onChange}
      placeholder={placeholder}
      type='text'
    />
  )
}

export default React.memo(styled(InputEmail)``);
