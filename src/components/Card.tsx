// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Card ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default styled(Card)`
  background: white;
  border: 1px solid rgb(221, 225, 235);
  border-radius: 0.25rem;
  margin: 0.5rem 0 1.5rem;
  padding: 1rem 1.5rem;
`;
