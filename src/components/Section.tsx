// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Section ({ children, className = '' }: Props): React.ReactElement<Props> {
  return (
    <div className={`${className} ui--Section`}>
      {children}
    </div>
  )
}

export default React.memo(styled(Section)`
  margin-top: 1.5rem;
`);
