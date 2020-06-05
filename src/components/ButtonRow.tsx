// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
}

function ButtonRow ({ children, className, isCenter }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} ${isCenter && 'isCenter'}`}>
      {children}
    </div>
  );
}

export default React.memo(styled(ButtonRow)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0.5rem 0;

  &.isCenter {
    justify-content: center;
  }

  button+button {
    margin-left: 0.5rem;
  }

  & + section {
    margin-top: 0.5rem;
  }
`);
