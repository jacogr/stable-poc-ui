// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: 'text' | 'password';
}

function Input ({ className, onChange, placeholder, type }: Props): React.ReactElement<Props> {
  const _onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
    [onChange]
  );

  return (
    <div className={className}>
      <input
        onChange={_onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

export default styled(Input)`
  margin: 0.5rem 0;

  > input {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
    width: 20rem;
  }
`;
