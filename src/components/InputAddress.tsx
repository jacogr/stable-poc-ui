// SPDX-License-Identifier: Apache-2

import { InputProps } from './types';

import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';

import { useIsUser } from '../hooks';
import InputEmail from './InputEmail';

interface Props extends InputProps {
  deriveAddress: (emails: string) => string;
  error?: string | null;
  onChange: (value: string) => void;
}

const ERR_ACTIVE = 'Not an active user';

function InputAddress ({ autoFocus, className, deriveAddress, error, isDisabled, onChange, placeholder, value }: Props): React.ReactElement<Props> {
  const [address, setAddress] = useState('');
  const isUserActive = useIsUser(address);
  const [errorVal, setError] = useState<string | null>(ERR_ACTIVE);

  const _onChange = useCallback(
    (email: string): void => {
      const address = email
        ? deriveAddress(email)
        : '';

      if (address) {
        setError(null);
      }

      setAddress(address);
      onChange(address);
    },
    [deriveAddress, onChange]
  );

  useEffect((): void => {
    if (!isUserActive) {
      setError(ERR_ACTIVE);
      onChange('');
    }
  }, [isUserActive]);

  return (
    <InputEmail
      autoFocus={autoFocus}
      className={className}
      isDisabled={isDisabled}
      error={errorVal || error}
      onChange={_onChange}
      placeholder={placeholder}
      type='text'
      value={value}
    />
  )
}

export default React.memo(styled(InputAddress)``);
