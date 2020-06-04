// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  isDisabled?: boolean;
  isThin?: boolean;
  label: string;
  onClick?: () => void;
}

function Button ({ className = '', isDisabled, isThin, label, onClick }: Props): React.ReactElement<Props> {
  const _onClick = useCallback(
    (): void => {
      !isDisabled && onClick && onClick();
    },
    [isDisabled, onClick]
  );

  return (
    <button
      className={`${className} ${isThin && 'isThin'}`}
      disabled={isDisabled}
      onClick={_onClick}
    >
      {label}
    </button>
  )
}

export default React.memo(styled(Button)`
  box-shadow: none;
  border: none;
  background: #002366;
  color: white;
  cursor: pointer;
  border-radius: 0.25rem;
  outline: none;
  padding: 0.75rem 1.25rem;

  &[disabled] {
    cursor: inherit;
    opacity: 0.25;
  }

  &.isThin {
    padding: 0.375rem 1.25rem;
  }
`);
