// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
  isError?: boolean;
  isWarning?: boolean;
}

function Card ({ children, className = '', isError, isWarning }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} ${isError && 'isError'} ${isWarning && 'isWarning'}`}>
      {children}
    </div>
  )
}

export default React.memo(styled(Card)`
  border: 1px solid rgb(221, 225, 235);
  border-radius: 0.25rem;
  margin: 0.5rem 0 1.5rem;
  padding: 0.75rem 1.5rem;

  &.isError {
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
  }

  &.isWarning {
    background: #ffffe0;
    border-color: #eeeeae;
  }
`);
