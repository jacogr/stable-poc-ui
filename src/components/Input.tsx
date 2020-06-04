// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import React, { useCallback } from 'react';
import styled from 'styled-components';

import Error from './Error';

interface Props extends InputProps {
  error?: string | null;
  onChange?: (value: string) => void;
  type: 'text' | 'password';
}

function Input ({ autoFocus, className = '', error, isDisabled, onChange, placeholder, type, value }: Props): React.ReactElement<Props> {
  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(event.target.value),
    [onChange]
  );

  return (
    <div className={`${className} ${error ? 'isError' : ''}`}>
      <input
        autoFocus={autoFocus}
        disabled={isDisabled}
        onChange={_onChange}
        placeholder={placeholder}
        type={type}
        value={isDisabled ? value : undefined}
      />
      <Error
        className='error'
        error={error}
      />
    </div>
  )
}

export default React.memo(styled(Input)`
  margin: 0.5rem 0;
  position: relative;

  > input {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: block;
    outline-color: rgba(0, 35, 102, 0.85);
    padding: 1rem 1.5rem;
    width: 100%;

    &[disabled] {
      opacity: 0.66;
    }
  }

  &.isError > input {
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    outline-color: #9f3a38;
  }

  .error {
    position: absolute;
    right: 0.5rem;
    top: 0.25rem;
  }
`);
