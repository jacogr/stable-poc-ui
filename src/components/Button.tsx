// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
}

function Button ({ className, isDisabled, label, onClick }: Props): React.ReactElement<Props> {
  const _onClick = useCallback(
    (): void => {
      !isDisabled && onClick();
    },
    [isDisabled, onClick]
  );

  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={_onClick}
    >
      {label}
    </button>
  )
}

export default styled(Button)`
  cursor: pointer;
  padding: 0.5rem 1.25rem;
`;
