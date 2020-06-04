// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function IconCheck ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      &#10003;
    </div>
  );
}

export default React.memo(styled(IconCheck)`
  color: #888;
  font-size: 80px;
  line-height: 80px;
  margin-bottom: 0.5rem;
  text-align: center;
`);
