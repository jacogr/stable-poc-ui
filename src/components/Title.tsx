// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Title ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <h4 className={className}>
      {children}
    </h4>
  )
}

export default styled(Title)`
  font-weight: 100;
  margin: 0;
`;
