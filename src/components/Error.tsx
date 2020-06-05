// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  error?: string | null;
}

function Error ({ className, error }: Props): React.ReactElement<Props> | null {
  if (!error) {
    return null;
  }

  return (
    <div className={className}>
      {error}
    </div>
  )
}

export default React.memo(styled(Error)`
  color: #9f3a38;
  text-align: right;
  font-size: 0.75rem;
  text-transform: lowercase;
`);
