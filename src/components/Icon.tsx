// SPDX-License-Identifier: Apache-2

import { IconProps } from './types';

import React from 'react';
import styled from 'styled-components';

interface Props extends IconProps {
  children: React.ReactNode;
}

function Icon ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default React.memo(styled(Icon)`
  color: #888;
  font-size: 80px;
  line-height: 80px;
  margin-bottom: 0.5rem;
  text-align: center;
`);
