// SPDX-License-Identifier: MIT

import { InputProps } from './types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from './Input';

interface Props extends InputProps {
  onChange: (value: string) => void;
}

function InputEmail ({ autoFocus, className, isDisabled, onChange, placeholder }: Props): React.ReactElement<Props> {
  const [isError, setIsError] = useState(true);

  const _onChange = useCallback(
    (value: string): void => {
      const indexAt = value.indexOf('@');
      const isError = !value || indexAt <= 0 || !value.substr(indexAt + 1).includes('.');

      setIsError(isError);
      onChange(isError ? '' : value);
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

export default React.memo(styled(InputEmail)``);
