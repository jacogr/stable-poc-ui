// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import React from 'react';
import styled from 'styled-components';

import Input from './Input';

interface Props extends InputProps {
  error?: string | null;
  onChange: (value: string) => void;
}

function InputPassword ({ autoFocus, className, error, isDisabled, onChange, placeholder, value }: Props): React.ReactElement<Props> {
  return (
    <Input
      autoFocus={autoFocus}
      className={className}
      error={error}
      isDisabled={isDisabled}
      onChange={onChange}
      placeholder={placeholder}
      type='password'
      value={value}
    />
  )
}

export default React.memo(styled(InputPassword)``);
