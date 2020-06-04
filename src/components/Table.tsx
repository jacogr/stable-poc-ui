// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Table ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <table className={className}>
      <tbody>
      {children}
      </tbody>
    </table>
  );
}

export default React.memo(styled(Table)`
  border: none;
  border-collapse: collapse;
  width: 100%;

  td {
    padding: 0.5rem 1rem;

    > button.isThin {
      margin-right: -0.5rem;
    }
  }

  tr:nth-child(odd) {
    background: rgba(0, 35, 102, 0.1);
  }
`);
