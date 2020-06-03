// SPDX-License-Identifier: MIT

import { InputProps } from './types';

import React from 'react';
import styled from 'styled-components';

import Input from './Input';

interface Props extends InputProps {
  isError?: boolean;
  onChange: (value: string) => void;
}

function InputPassword ({ autoFocus, className, isDisabled, isError, onChange, placeholder }: Props): React.ReactElement<Props> {
  return (
    <Input
      autoFocus={autoFocus}
      className={className}
      isDisabled={isDisabled}
      isError={isError}
      onChange={onChange}
      placeholder={placeholder}
      type='password'
    />
  )
}

export default React.memo(styled(InputPassword)``);
