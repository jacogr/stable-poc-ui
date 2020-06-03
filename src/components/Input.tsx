// SPDX-License-Identifier: MIT

import { InputProps } from './types';

import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props extends InputProps {
  isError?: boolean;
  onChange: (value: string) => void;
  type: 'text' | 'password';
}

function Input ({ autoFocus, className = '', isDisabled, isError, onChange, placeholder, type }: Props): React.ReactElement<Props> {
  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );

  return (
    <div className={`${className} ${isError ? 'isError' : ''}`}>
      <input
        autoFocus={autoFocus}
        disabled={isDisabled}
        onChange={_onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export default React.memo(styled(Input)`
  margin: 0.5rem 0;

  > input {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
    width: 22.5rem;

    &[disabled] {
      opacity: 0.5;
    }
  }

  &.isError > input {
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
  }
`);
