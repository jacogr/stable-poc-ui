// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useIsUserActive } from '../hooks';
import InputEmail from './InputEmail';

interface Props extends InputProps {
  deriveAddress: (emails: string) => string;
  error?: string | null;
  onChange: (value: string) => void;
}

const ERR_ACTIVE = 'Not an active user';

function InputAddress ({ autoFocus, className, deriveAddress, error, isDisabled, onChange, placeholder, value }: Props): React.ReactElement<Props> {
  const [address, setAddress] = useState('');
  const isUserActive = useIsUserActive(address);

  const _onChange = useCallback(
    (email: string): void => {
      const address = email
        ? deriveAddress(email)
        : '';

      setAddress(address);
    },
    [deriveAddress, onChange]
  );

  useEffect((): void => {
    onChange(isUserActive ? address : '');
  }, [address, isUserActive, onChange]);

  return (
    <InputEmail
      autoFocus={autoFocus}
      className={className}
      isDisabled={isDisabled}
      error={(isUserActive ? null : ERR_ACTIVE) || error}
      onChange={_onChange}
      placeholder={placeholder}
      type='text'
      value={value}
    />
  )
}

export default React.memo(styled(InputAddress)``);
