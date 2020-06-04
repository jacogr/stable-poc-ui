// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Title ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default React.memo(styled(Title)`
  color: rgba(0, 35, 102, 0.35);
  font-size: 1.1rem;
  font-weight: 100;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
`);
